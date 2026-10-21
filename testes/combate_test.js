
import test from "node:test";
import assert from "node:assert/strict";

import {
    loboDaFloresta
} from "../dados/monstros/lobo-da-floresta.js";

import {
    calcularEstatisticasPersonagem,
    calcularDano
} from "../aplicativos/jogo/combate/regras.js";

import {
    iniciarCombate,
    executarTurnoPersonagem,
    executarTurnoMonstro
} from "../aplicativos/jogo/combate/combate.js";

import {
    concederRecompensaVitoria
} from "../aplicativos/jogo/combate/recompensas.js";

import {
    salvarPersonagem,
    carregarPersonagem,
    removerPersonagem
} from "../aplicativos/jogo/personagem/armazenamento.js";


function criarPersonagem({
    forca = 5,
    constituicao = 4,
    agilidade = 7
} = {}) {
    return {
        nome: "Aventureiro",
        nivel: 1,
        xp: 0,
        atributos: {
            forca,
            constituicao,
            agilidade
        }
    };
}

function criarLocalStorageFalso() {
    const dados = new Map();

    return {
        getItem(chave) {
            return dados.get(chave) ?? null;
        },

        setItem(chave, valor) {
            dados.set(chave, String(valor));
        },

        removeItem(chave) {
            dados.delete(chave);
        }
    };
}

function criarPersonagemArmazenavel() {
    const atributos = {
        forca: 5,
        destreza: 5,
        agilidade: 5,
        constituicao: 5,
        inteligencia: 5,
        sabedoria: 5,
        carisma: 5,
        sorte: 5
    };

    const maestrias = Object.fromEntries(
        Object.keys(atributos).map(atributo => [
            atributo,
            {
                xp: 0,
                pontosAcumulados: 0
            }
        ])
    );

    return {
        nome: "Aventureiro",
        nivel: 1,
        xp: 0,
        classe: null,
        atributos,
        maestrias,
        localizacao: {
            regiaoId: "regiao-inicial",
            cidadeId: "cidade-inicial",
            localId: "praca"
        }
    };
}


test("estatísticas são calculadas a partir dos atributos", () => {
    const resultado = calcularEstatisticasPersonagem(
        criarPersonagem()
    );

    assert.equal(resultado.sucesso, true);
    assert.equal(resultado.estatisticas.vidaMaxima, 60);
    assert.equal(resultado.estatisticas.ataque, 15);
    assert.equal(resultado.estatisticas.defesa, 2);
    assert.equal(resultado.estatisticas.agilidade, 7);
});

test("dano nunca é inferior a 1", () => {
    assert.deepEqual(calcularDano(3, 10), {
        sucesso: true,
        dano: 1
    });
});

test("valores inválidos de dano são rejeitados", () => {
    assert.equal(calcularDano(-1, 0).sucesso, false);
    assert.equal(calcularDano(10, NaN).sucesso, false);
});

test("personagem mais ágil começa o combate", () => {
    const resultado = iniciarCombate(
        criarPersonagem(),
        loboDaFloresta
    );

    assert.equal(resultado.sucesso, true);
    assert.equal(resultado.combate.turnoAtual, "personagem");
    assert.equal(resultado.combate.status, "em_andamento");
});

test("monstro mais ágil começa o combate", () => {
    const resultado = iniciarCombate(
        criarPersonagem({ agilidade: 1 }),
        loboDaFloresta
    );

    assert.equal(resultado.combate.turnoAtual, "monstro");
});

test("personagem não pode agir fora do próprio turno", () => {
    const resultado = iniciarCombate(
        criarPersonagem({ agilidade: 1 }),
        loboDaFloresta
    );

    const ataque = executarTurnoPersonagem(
        resultado.combate
    );

    assert.equal(ataque.sucesso, false);
});

test("ataque reduz a vida do monstro e passa o turno", () => {
    const resultado = iniciarCombate(
        criarPersonagem(),
        loboDaFloresta
    );

    const vidaInicial = resultado.combate.monstro.vida;
    const ataque = executarTurnoPersonagem(
        resultado.combate
    );

    assert.equal(ataque.sucesso, true);

    assert.equal(
        resultado.combate.monstro.vida,
        vidaInicial - ataque.dano
    );

    assert.equal(resultado.combate.turnoAtual, "monstro");
});

test("vitória concede e salva XP apenas uma vez", () => {
    const armazenamentoOriginal = globalThis.localStorage;
    globalThis.localStorage = criarLocalStorageFalso();

    try {
        const personagemSalvo = criarPersonagemArmazenavel();

        assert.equal(
            salvarPersonagem(personagemSalvo).sucesso,
            true
        );

        const resultado = iniciarCombate(
            criarPersonagem({
                forca: 20,
                constituicao: 4,
                agilidade: 10
            }),
            loboDaFloresta
        );

        assert.equal(resultado.sucesso, true);

        executarTurnoPersonagem(resultado.combate);

        assert.equal(resultado.combate.status, "vitoria");
        assert.equal(resultado.combate.monstro.vida, 0);

        const recompensa = concederRecompensaVitoria(
            resultado.combate
        );

        assert.equal(recompensa.sucesso, true);
        assert.equal(recompensa.xpConcedido, 100);
        assert.equal(recompensa.experienciaTotal, 100);
        assert.equal(resultado.combate.recompensaReclamada, true);

        const personagemAtualizado = carregarPersonagem();

        assert.equal(personagemAtualizado.xp, 100);

        const segundaRecompensa = concederRecompensaVitoria(
            resultado.combate
        );

        assert.equal(segundaRecompensa.sucesso, false);
        assert.equal(carregarPersonagem().xp, 100);

        assert.equal(
            executarTurnoPersonagem(resultado.combate).sucesso,
            false
        );
    } finally {
        removerPersonagem();
        globalThis.localStorage = armazenamentoOriginal;
    }
});

test("derrota não permite receber recompensa de vitória", () => {
    const monstroForte = {
        ...loboDaFloresta,
        ataque: 100,
        agilidade: 100
    };

    const resultado = iniciarCombate(
        criarPersonagem({
            forca: 1,
            constituicao: 0,
            agilidade: 1
        }),
        monstroForte
    );

    executarTurnoMonstro(resultado.combate);

    assert.equal(resultado.combate.status, "derrota");
    assert.equal(resultado.combate.personagem.vida, 0);

    assert.equal(
        concederRecompensaVitoria(resultado.combate).sucesso,
        false
    );
});
