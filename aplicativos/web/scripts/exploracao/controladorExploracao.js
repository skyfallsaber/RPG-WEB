import {
    renderizarCenario,
    renderizarCriaturas
} from "./renderizadorCanvas.js";

import { cenarioPraca } from "../../../../dados/mundo/cenarios/praca.js";
import { posicaoBloqueada } from "./colisoes.js";
import {
    criarControladorCriaturas
} from "./controladorCriaturas.js";

const DISTANCIA_MAXIMA_INTERACAO = 2;
const TAMANHO_CELULA = 48;
const INTERVALO_PATRULHA = 1000;

const TECLAS_MOVIMENTO = new Set([
    "w", "a", "s", "d",
    "arrowup", "arrowdown", "arrowleft", "arrowright"
]);

const DIRECOES_CRIATURAS = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
];

export function iniciarExploracao(canvas, localId = "praca") {
    if (
        typeof HTMLCanvasElement === "undefined" ||
        !(canvas instanceof HTMLCanvasElement)
    ) {
        throw new TypeError(
            "O elemento informado precisa ser um Canvas HTML."
        );
    }

    const contexto = canvas.getContext("2d");

    if (!contexto) {
        throw new Error(
            "Não foi possível obter o contexto 2D do Canvas."
        );
    }

    const cenarios = {
        praca: cenarioPraca
    };

    const cenario = cenarios[localId];

    if (!cenario) {
        throw new Error(
            `Não existe cenário cadastrado para o local "${localId}".`
        );
    }

    canvas.width = cenario.largura * TAMANHO_CELULA;
    canvas.height = cenario.altura * TAMANHO_CELULA;
    canvas.tabIndex = 0;
    canvas.setAttribute("role", "application");
    canvas.setAttribute(
        "aria-label",
        "Mapa explorável. Use as teclas W, A, S, D ou as setas para mover o personagem."
    );

    const controladorCriaturas = criarControladorCriaturas(cenario);

    const personagem = {
        x: 5,
        y: 9,
        cor: "#f5d76e"
    };

    let encerrada = false;
    let temporizadorPatrulha = null;
    let areaAtual = null;

    function posicaoOcupadaPorCriatura(x, y, ignorarId = null) {
        return controladorCriaturas.listar().some((criatura) => {
            return (
                criatura.id !== ignorarId &&
                criatura.x === x &&
                criatura.y === y
            );
        });
    }

    function posicaoOcupadaPorPersonagem(x, y) {
        return personagem.x === x && personagem.y === y;
    }

    function podeCriaturaMoverPara(criatura, x, y) {
        if (posicaoBloqueada(cenario, x, y)) {
            return false;
        }

        if (posicaoOcupadaPorPersonagem(x, y)) {
            return false;
        }

        if (posicaoOcupadaPorCriatura(x, y, criatura.id)) {
            return false;
        }

        return true;
    }

    function patrulharCriaturas() {
        if (encerrada) {
            return;
        }

        const criaturas = controladorCriaturas.listar();
        let houveMovimento = false;

        for (const criatura of criaturas) {
            const direcoes = [...DIRECOES_CRIATURAS];

            // Embaralha a ordem para variar os movimentos da criatura.
            for (let i = direcoes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [direcoes[i], direcoes[j]] = [
                    direcoes[j],
                    direcoes[i]
                ];
            }

            for (const direcao of direcoes) {
                const novoX = criatura.x + direcao.x;
                const novoY = criatura.y + direcao.y;

                if (!podeCriaturaMoverPara(criatura, novoX, novoY)) {
                    continue;
                }

                if (
                    controladorCriaturas.mover(
                        criatura.id,
                        novoX,
                        novoY
                    )
                ) {
                    houveMovimento = true;
                }

                break;
            }
        }

        if (houveMovimento) {
            desenhar();
        }
    }

    function desenhar() {
        areaAtual = renderizarCenario(contexto, cenario, {
            tamanhoCelula: TAMANHO_CELULA
        });

        const centroX =
            areaAtual.deslocamentoX +
            (personagem.x + 0.5) * areaAtual.tamanhoCelula;

        const centroY =
            areaAtual.deslocamentoY +
            (personagem.y + 0.5) * areaAtual.tamanhoCelula;

        const escala = areaAtual.tamanhoCelula;

        // Sombra no chão
        contexto.beginPath();
        contexto.ellipse(
            centroX,
            centroY + escala * 0.36,
            escala * 0.23,
            escala * 0.10,
            0,
            0,
            Math.PI * 2
        );
        contexto.fillStyle = "rgba(0, 0, 0, 0.35)";
        contexto.fill();

        // Configuração do contorno
        contexto.lineWidth = escala * 0.045;
        contexto.lineCap = "round";
        contexto.lineJoin = "round";
        contexto.strokeStyle = "#382b27";

        // Pernas
        contexto.beginPath();
        contexto.moveTo(
            centroX - escala * 0.07,
            centroY + escala * 0.12
        );
        contexto.lineTo(
            centroX - escala * 0.10,
            centroY + escala * 0.29
        );
        contexto.moveTo(
            centroX + escala * 0.07,
            centroY + escala * 0.12
        );
        contexto.lineTo(
            centroX + escala * 0.10,
            centroY + escala * 0.29
        );
        contexto.stroke();

        // Botas
        contexto.beginPath();
        contexto.moveTo(
            centroX - escala * 0.10,
            centroY + escala * 0.29
        );
        contexto.lineTo(
            centroX - escala * 0.17,
            centroY + escala * 0.31
        );
        contexto.moveTo(
            centroX + escala * 0.10,
            centroY + escala * 0.29
        );
        contexto.lineTo(
            centroX + escala * 0.17,
            centroY + escala * 0.31
        );
        contexto.stroke();

        // Braços
        contexto.beginPath();
        contexto.moveTo(
            centroX - escala * 0.10,
            centroY - escala * 0.07
        );
        contexto.lineTo(
            centroX - escala * 0.19,
            centroY + escala * 0.09
        );
        contexto.moveTo(
            centroX + escala * 0.10,
            centroY - escala * 0.07
        );
        contexto.lineTo(
            centroX + escala * 0.19,
            centroY + escala * 0.09
        );
        contexto.stroke();

        // Mãos
        contexto.fillStyle = "#e9b58c";

        for (const lado of [-1, 1]) {
            contexto.beginPath();
            contexto.arc(
                centroX + lado * escala * 0.19,
                centroY + escala * 0.10,
                escala * 0.045,
                0,
                Math.PI * 2
            );
            contexto.fill();
            contexto.stroke();
        }

        // Tronco: túnica de aventureiro
        contexto.beginPath();
        contexto.roundRect(
            centroX - escala * 0.12,
            centroY - escala * 0.13,
            escala * 0.24,
            escala * 0.29,
            escala * 0.06
        );
        contexto.fillStyle = "#3d79a5";
        contexto.fill();
        contexto.stroke();

        // Cinto
        contexto.beginPath();
        contexto.moveTo(
            centroX - escala * 0.11,
            centroY + escala * 0.07
        );
        contexto.lineTo(
            centroX + escala * 0.11,
            centroY + escala * 0.07
        );
        contexto.strokeStyle = "#654326";
        contexto.lineWidth = escala * 0.055;
        contexto.stroke();

        // Cabeça
        contexto.beginPath();
        contexto.arc(
            centroX,
            centroY - escala * 0.22,
            escala * 0.14,
            0,
            Math.PI * 2
        );
        contexto.fillStyle = "#e9b58c";
        contexto.fill();
        contexto.lineWidth = escala * 0.04;
        contexto.strokeStyle = "#382b27";
        contexto.stroke();

        // Cabelo
        contexto.beginPath();
        contexto.arc(
            centroX,
            centroY - escala * 0.255,
            escala * 0.14,
            Math.PI,
            Math.PI * 2
        );
        contexto.lineTo(
            centroX + escala * 0.12,
            centroY - escala * 0.22
        );
        contexto.lineTo(
            centroX + escala * 0.04,
            centroY - escala * 0.25
        );
        contexto.lineTo(
            centroX - escala * 0.02,
            centroY - escala * 0.20
        );
        contexto.lineTo(
            centroX - escala * 0.09,
            centroY - escala * 0.23
        );
        contexto.closePath();
        contexto.fillStyle = "#493126";
        contexto.fill();
        contexto.stroke();

        // Olhos
        contexto.fillStyle = "#29221e";

        for (const lado of [-1, 1]) {
            contexto.beginPath();
            contexto.arc(
                centroX + lado * escala * 0.05,
                centroY - escala * 0.22,
                escala * 0.018,
                0,
                Math.PI * 2
            );
            contexto.fill();
        }

        renderizarCriaturas(
            contexto,
            controladorCriaturas.listar(),
            areaAtual
        );

        return areaAtual;
    }

    function aoPressionarTecla(evento) {
        if (
            encerrada ||
            evento.altKey ||
            evento.ctrlKey ||
            evento.metaKey
        ) {
            return;
        }

        const tecla = evento.key.toLowerCase();

        if (!TECLAS_MOVIMENTO.has(tecla)) {
            return;
        }

        evento.preventDefault();

        let dx = 0;
        let dy = 0;

        switch (tecla) {
            case "w":
            case "arrowup":
                dy = -1;
                break;

            case "s":
            case "arrowdown":
                dy = 1;
                break;

            case "a":
            case "arrowleft":
                dx = -1;
                break;

            case "d":
            case "arrowright":
                dx = 1;
                break;
        }

        const novoX = personagem.x + dx;
        const novoY = personagem.y + dy;

        if (posicaoBloqueada(cenario, novoX, novoY)) {
            return;
        }

        if (posicaoOcupadaPorCriatura(novoX, novoY)) {
            return;
        }

        personagem.x = novoX;
        personagem.y = novoY;

        desenhar();
    }

    function aoClicarCanvas(evento) {
    if (encerrada || !areaAtual) {
        return;
    }

    const retangulo = canvas.getBoundingClientRect();

    const escalaX = canvas.width / retangulo.width;
    const escalaY = canvas.height / retangulo.height;

    const mouseX = (evento.clientX - retangulo.left) * escalaX;
    const mouseY = (evento.clientY - retangulo.top) * escalaY;

    const celulaX = Math.floor(
        (mouseX - areaAtual.deslocamentoX) /
        areaAtual.tamanhoCelula
    );

    const celulaY = Math.floor(
        (mouseY - areaAtual.deslocamentoY) /
        areaAtual.tamanhoCelula
    );

    const criatura = controladorCriaturas.listar().find(
        (item) => item.x === celulaX && item.y === celulaY
    );

    if (!criatura) {
        return;
    }

    const distanciaX = Math.abs(personagem.x - criatura.x);
    const distanciaY = Math.abs(personagem.y - criatura.y);

    const distancia = Math.max(distanciaX, distanciaY);

    if (distancia > DISTANCIA_MAXIMA_INTERACAO) {
        return;
    }

    const destino = new URL(
        "/telas/combate.html",
        window.location.origin
    );

    destino.searchParams.set("monstroId", criatura.monstroId);

    window.location.href = destino.href;
}

    canvas.addEventListener("keydown", aoPressionarTecla);
    canvas.addEventListener("click", aoClicarCanvas);

    desenhar();
    canvas.focus();

    temporizadorPatrulha = setInterval(
        patrulharCriaturas,
        INTERVALO_PATRULHA
    );

    return {
        canvas,
        contexto,
        cenario,
        personagem,
        controladorCriaturas,

        desenhar,

        destruir() {
            if (encerrada) {
                return;
            }

            encerrada = true;

            if (temporizadorPatrulha !== null) {
                clearInterval(temporizadorPatrulha);
                temporizadorPatrulha = null;
            }

            canvas.removeEventListener(
                "keydown",
                aoPressionarTecla
            );
            canvas.removeEventListener(
                "click",
                aoClicarCanvas
            );
        }
    };
}
