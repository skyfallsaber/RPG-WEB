import test from "node:test";
import assert from "node:assert/strict";
import { renderizarCenario } from "../aplicativos/web/scripts/exploracao/renderizadorCanvas.js";

function criarContextoFalso() {
    const chamadas = [];
    return {
        chamadas,
        canvas: { width: 320, height: 240 },
        fillStyle: "",
        strokeStyle: "",
        lineWidth: 1,
        fillRect(...args) { chamadas.push(["fillRect", ...args]); },
        clearRect(...args) { chamadas.push(["clearRect", ...args]); },
        strokeRect(...args) { chamadas.push(["strokeRect", ...args]); },
        beginPath() {},
        arc() {},
        ellipse() {},
        moveTo() {},
        lineTo() {},
        closePath() {},
        fill() {}
    };
}

const cenarioMinimo = {
    id: "teste",
    localId: "local-teste",
    nome: "Teste",
    largura: 2,
    altura: 2,
    terreno: [
        ["grama", "terra"],
        ["pedra", "agua"]
    ],
    objetos: []
};

test("renderizarCenario desenha o fundo e todas as células do terreno", () => {
    const contexto = criarContextoFalso();
    const resultado = renderizarCenario(contexto, cenarioMinimo);

    assert.ok(contexto.chamadas.some(([nome]) => nome === "clearRect"));
    // 1 retângulo de fundo + 4 células.
    assert.equal(contexto.chamadas.filter(([nome]) => nome === "fillRect").length, 5);
    assert.equal(resultado.tamanhoCelula, 120);
});

test("renderizarCenario rejeita terreno com dimensões inconsistentes", () => {
    const contexto = criarContextoFalso();
    const cenarioInvalido = {
        ...cenarioMinimo,
        terreno: [["grama"], ["grama", "grama"]]
    };

    assert.throws(() => renderizarCenario(contexto, cenarioInvalido), /largura definida/);
});

test("renderizarCenario rejeita tipo de terreno desconhecido", () => {
    const contexto = criarContextoFalso();
    const cenarioInvalido = {
        ...cenarioMinimo,
        terreno: [
            ["lava", "grama"],
            ["grama", "grama"]
        ]
    };

    assert.throws(() => renderizarCenario(contexto, cenarioInvalido), /não reconhecido/);
});

test("renderizarCenario centraliza o cenário quando sobra espaço", () => {
    const contexto = criarContextoFalso();
    const resultado = renderizarCenario(contexto, cenarioMinimo, {
        largura: 400,
        altura: 300,
        tamanhoCelula: 100
    });

    assert.equal(resultado.deslocamentoX, 100);
    assert.equal(resultado.deslocamentoY, 50);
});
