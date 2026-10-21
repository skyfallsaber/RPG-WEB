
import {
    carregarPersonagem
} from "/jogo/personagem/armazenamento.js";

import {
    obterMonstro
} from "/dados/monstros/indice.js";

import {
    iniciarCombate
} from "/jogo/combate/combate.js";

import {
    executarTurnoAtual
} from "/jogo/combate/fluxoCombate.js";

import {
    concederRecompensaVitoria
} from "/jogo/combate/recompensas.js";


const elemento = id => document.getElementById(id);

const botaoAcao = elemento("botao-acao");
const botaoVoltar = elemento("botao-voltar");

let combate = null;
let processando = false;


botaoVoltar.addEventListener("click", () => {
    window.location.href = "/telas/inicio.html";
});

botaoAcao.addEventListener("click", async () => {
    if (processando) {
        return;
    }

    if (combate?.status === "vitoria" || combate?.status === "derrota") {
        window.location.href = "/telas/inicio.html";
        return;
    }

    if (!combate || combate.status !== "em_andamento") {
        return;
    }

    processando = true;
    botaoAcao.disabled = true;

    await executarTurno();
});


function prepararCombate() {
    const personagem = carregarPersonagem();

    if (!personagem) {
        elemento("mensagem-status").textContent =
            "Nenhum personagem foi encontrado.";

        elemento("titulo-acao").textContent =
            "Crie um personagem primeiro";

        elemento("descricao-acao").textContent =
            "Volte à página inicial para criar seu personagem.";

        botaoAcao.textContent = "Voltar à aventura";
        botaoAcao.disabled = false;

        botaoAcao.onclick = () => {
            window.location.href = "/telas/criacao-personagem.html";
        };

        return;
    }

    const monstro = obterMonstro("lobo-da-floresta");

    if (!monstro) {
        elemento("mensagem-status").textContent =
            "Não foi possível encontrar o monstro.";

        botaoAcao.disabled = true;
        return;
    }

    const resultado = iniciarCombate(personagem, monstro);

    if (!resultado.sucesso) {
        elemento("mensagem-status").textContent =
            resultado.mensagem || "Não foi possível iniciar o combate.";

        botaoAcao.disabled = true;
        return;
    }

    combate = resultado.combate;

    elemento("nome-personagem").textContent = personagem.nome;
    elemento("nome-monstro").textContent = combate.monstro.nome;

    atualizarInterface();

    if (combate.turnoAtual === "monstro") {
        elemento("mensagem-status").textContent =
            "O monstro é mais ágil e ataca primeiro.";

        processando = true;
        botaoAcao.disabled = true;

        setTimeout(executarTurno, 700);
    } else {
        botaoAcao.disabled = false;
    }
}


async function executarTurno() {
    try {
        const resultado = executarTurnoAtual(combate);

        if (!resultado.sucesso) {
            elemento("mensagem-status").textContent =
                resultado.mensagem || "Não foi possível executar o turno.";

            atualizarInterface();
            return;
        }

        atualizarInterface();

        if (combate.status === "vitoria") {
            const recompensa = concederRecompensaVitoria(combate);

            if (recompensa.sucesso) {
                combate.log.push(
                    `Experiência total: ${recompensa.experienciaTotal} XP.`
                );

                if (recompensa.niveisGanhos > 0) {
                    combate.log.push(
                        `Você subiu ${recompensa.niveisGanhos} nível(is)!`
                    );
                }

                elemento("mensagem-status").textContent =
                    `Vitória! Você recebeu ${recompensa.xpConcedido} XP.`;
            } else {
                elemento("mensagem-status").textContent =
                    `Você venceu, mas a recompensa falhou: ${recompensa.mensagem || "erro ao salvar XP"}`;
            }

            elemento("titulo-acao").textContent = "Combate encerrado";
            elemento("descricao-acao").textContent =
                "Volte à aventura para continuar sua jornada.";

            atualizarInterface();
            botaoAcao.textContent = "Voltar à aventura";
            return;
        }

        if (combate.status === "derrota") {
            elemento("mensagem-status").textContent =
                "Você foi derrotado. Seu personagem retornou à Praça.";

            elemento("titulo-acao").textContent = "Combate encerrado";
            elemento("descricao-acao").textContent =
                "Nenhuma recompensa foi concedida.";

            atualizarInterface();
            botaoAcao.textContent = "Voltar à aventura";
            return;
        }

        if (combate.turnoAtual === "monstro") {
            elemento("mensagem-status").textContent =
                "O monstro está preparando seu ataque...";

            await new Promise(resolve => setTimeout(resolve, 700));

            const turnoMonstro = executarTurnoAtual(combate);

            if (!turnoMonstro.sucesso) {
                elemento("mensagem-status").textContent =
                    turnoMonstro.mensagem || "Não foi possível executar o turno do monstro.";

                atualizarInterface();
                return;
            }

            atualizarInterface();

            if (combate.status === "derrota") {
                elemento("mensagem-status").textContent =
                    "Você foi derrotado. Seu personagem retornou à Praça.";

                elemento("titulo-acao").textContent = "Combate encerrado";
                elemento("descricao-acao").textContent =
                    "Nenhuma recompensa foi concedida.";

                botaoAcao.textContent = "Voltar à aventura";
                return;
            }
        }

        elemento("mensagem-status").textContent = "Sua vez de agir.";
    } catch (erro) {
        console.error("Erro durante o combate:", erro);

        elemento("mensagem-status").textContent =
            "Ocorreu um erro durante o combate. Verifique o console.";

    } finally {
        processando = false;
        botaoAcao.disabled = false;
    }
}


function atualizarInterface() {
    if (!combate) {
        return;
    }

    atualizarVida(
        "barra-vida-personagem",
        "vida-personagem",
        combate.personagem.vida,
        combate.personagem.vidaMaxima
    );

    atualizarVida(
        "barra-vida-monstro",
        "vida-monstro",
        combate.monstro.vida,
        combate.monstro.vidaMaxima
    );

    elemento("registro-combate").replaceChildren(
        ...combate.log.map(mensagem => {
            const item = document.createElement("li");
            item.textContent = mensagem;
            return item;
        })
    );

    if (combate.status === "em_andamento") {
        elemento("titulo-acao").textContent =
            combate.turnoAtual === "personagem"
                ? "Sua vez de agir"
                : "Turno do monstro";

        elemento("descricao-acao").textContent =
            combate.turnoAtual === "personagem"
                ? "Ataque o inimigo para continuar."
                : "O inimigo está atacando.";
    }

    botaoAcao.disabled =
        processando || combate.status === "derrota";
}


function atualizarVida(idBarra, idTexto, vida, vidaMaxima) {
    const percentual = Math.max(
        0,
        Math.min(100, (vida / vidaMaxima) * 100)
    );

    elemento(idBarra).style.width = `${percentual}%`;

    elemento(idTexto).textContent =
        `${vida} / ${vidaMaxima} HP`;
}


prepararCombate();
