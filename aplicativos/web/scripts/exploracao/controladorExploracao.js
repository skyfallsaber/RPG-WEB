import { renderizarCenario } from "./renderizadorCanvas.js";
import { cenarioPraca } from "../../../../dados/mundo/cenarios/praca.js";
import { posicaoBloqueada } from "./colisoes.js";

const TAMANHO_CELULA = 48;
const TECLAS_MOVIMENTO = new Set([
    "w", "a", "s", "d",
    "arrowup", "arrowdown", "arrowleft", "arrowright"
]);

export function iniciarExploracao(canvas, localId = "praca") {
    if (typeof HTMLCanvasElement === "undefined" ||
        !(canvas instanceof HTMLCanvasElement)) {
        throw new TypeError("O elemento informado precisa ser um Canvas HTML.");
    }

    const contexto = canvas.getContext("2d");

    if (!contexto) {
        throw new Error("Não foi possível obter o contexto 2D do Canvas.");
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

    const personagem = {
        x: 5,
        y: 9,
        cor: "#f5d76e"
    };

    let encerrada = false;

    function desenhar() {
        const area = renderizarCenario(contexto, cenario, {
            tamanhoCelula: TAMANHO_CELULA
        });
        canvas.focus();

        
const centroX =
    area.deslocamentoX + (personagem.x + 0.5) * area.tamanhoCelula;

const centroY =
    area.deslocamentoY + (personagem.y + 0.5) * area.tamanhoCelula;

const escala = area.tamanhoCelula;

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
contexto.moveTo(centroX - escala * 0.07, centroY + escala * 0.12);
contexto.lineTo(centroX - escala * 0.10, centroY + escala * 0.29);
contexto.moveTo(centroX + escala * 0.07, centroY + escala * 0.12);
contexto.lineTo(centroX + escala * 0.10, centroY + escala * 0.29);
contexto.stroke();

// Botas
contexto.beginPath();
contexto.moveTo(centroX - escala * 0.10, centroY + escala * 0.29);
contexto.lineTo(centroX - escala * 0.17, centroY + escala * 0.31);
contexto.moveTo(centroX + escala * 0.10, centroY + escala * 0.29);
contexto.lineTo(centroX + escala * 0.17, centroY + escala * 0.31);
contexto.stroke();

// Braços
contexto.beginPath();
contexto.moveTo(centroX - escala * 0.10, centroY - escala * 0.07);
contexto.lineTo(centroX - escala * 0.19, centroY + escala * 0.09);
contexto.moveTo(centroX + escala * 0.10, centroY - escala * 0.07);
contexto.lineTo(centroX + escala * 0.19, centroY + escala * 0.09);
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
contexto.moveTo(centroX - escala * 0.11, centroY + escala * 0.07);
contexto.lineTo(centroX + escala * 0.11, centroY + escala * 0.07);
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
contexto.lineTo(centroX + escala * 0.12, centroY - escala * 0.22);
contexto.lineTo(centroX + escala * 0.04, centroY - escala * 0.25);
contexto.lineTo(centroX - escala * 0.02, centroY - escala * 0.20);
contexto.lineTo(centroX - escala * 0.09, centroY - escala * 0.23);
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


        return area;
    }

    function aoPressionarTecla(evento) {
        if (encerrada || evento.altKey || evento.ctrlKey || evento.metaKey) {
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

        // Impede atravessar limites, terrenos bloqueados e objetos.
        if (posicaoBloqueada(cenario, novoX, novoY)) {
            return;
        }

        personagem.x = novoX;
        personagem.y = novoY;

        desenhar();
    }

    canvas.addEventListener("keydown", aoPressionarTecla);

    desenhar();

    return {
        canvas,
        contexto,
        cenario,
        personagem,

        desenhar,

        destruir() {
            if (encerrada) {
                return;
            }

            encerrada = true;
            canvas.removeEventListener("keydown", aoPressionarTecla);
        }
    };
}
