import { renderizarCenario } from "./renderizadorCanvas.js";
import { cenarioPraca } from "../../../../dados/mundo/cenarios/praca.js";

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
            area.deslocamentoX +
            (personagem.x + 0.5) * area.tamanhoCelula;

        const centroY =
            area.deslocamentoY +
            (personagem.y + 0.5) * area.tamanhoCelula;

        // Sombra para destacar o personagem sobre o terreno.
        contexto.beginPath();
        contexto.ellipse(
            centroX,
            centroY + area.tamanhoCelula * 0.2,
            area.tamanhoCelula * 0.22,
            area.tamanhoCelula * 0.12,
            0,
            0,
            Math.PI * 2
        );
        contexto.fillStyle = "rgba(0, 0, 0, 0.35)";
        contexto.fill();

        // Corpo provisório do personagem.
        contexto.beginPath();
        contexto.arc(
            centroX,
            centroY,
            area.tamanhoCelula * 0.27,
            0,
            Math.PI * 2
        );
        contexto.fillStyle = personagem.cor;
        contexto.fill();

        contexto.lineWidth = 2;
        contexto.strokeStyle = "#493b1b";
        contexto.stroke();

        // Indicador central para facilitar a visualização.
        contexto.beginPath();
        contexto.arc(
            centroX,
            centroY,
            area.tamanhoCelula * 0.09,
            0,
            Math.PI * 2
        );
        contexto.fillStyle = "#493b1b";
        contexto.fill();

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

        // Nesta etapa, impedimos apenas que o personagem saia do mapa.
        if (
            novoX < 0 ||
            novoX >= cenario.largura ||
            novoY < 0 ||
            novoY >= cenario.altura
        ) {
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
