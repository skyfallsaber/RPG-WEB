const CORES_TERRENO = {
    grama: "#547b3b",
    terra: "#9b7446",
    pedra: "#777b7b",
    agua: "#367f9b"
};

function validarCenario(cenario) {
    if (!cenario || typeof cenario !== "object") {
        throw new TypeError("O cenário precisa ser um objeto.");
    }

    const { largura, altura, terreno, objetos } = cenario;

    if (!Number.isInteger(largura) || largura < 1 ||
        !Number.isInteger(altura) || altura < 1) {
        throw new TypeError("A largura e a altura do cenário devem ser inteiros positivos.");
    }

    if (!Array.isArray(terreno) || terreno.length !== altura) {
        throw new TypeError("O terreno deve conter uma linha para cada unidade de altura.");
    }

    for (const linha of terreno) {
        if (!Array.isArray(linha) || linha.length !== largura) {
            throw new TypeError("Todas as linhas do terreno devem ter a largura definida no cenário.");
        }
        for (const tipo of linha) {
            if (!(tipo in CORES_TERRENO)) {
                throw new TypeError(`Tipo de terreno não reconhecido: ${tipo}`);
            }
        }
    }

    if (objetos !== undefined && !Array.isArray(objetos)) {
        throw new TypeError("A propriedade objetos deve ser uma lista.");
    }
}

/**
 * Desenha um cenário no contexto Canvas informado.
 * A função não altera o estado do jogo e não guarda referências ao canvas.
 *
 * @param {CanvasRenderingContext2D} contexto
 * @param {object} cenario
 * @param {{ largura?: number, altura?: number, tamanhoCelula?: number }} [opcoes]
 */
export function renderizarCenario(contexto, cenario, opcoes = {}) {
    if (!contexto || typeof contexto.fillRect !== "function") {
        throw new TypeError("É necessário fornecer um contexto 2D válido.");
    }

    validarCenario(cenario);

    const largura = opcoes.largura ?? contexto.canvas?.width;
    const altura = opcoes.altura ?? contexto.canvas?.height;

    if (!Number.isFinite(largura) || largura <= 0 ||
        !Number.isFinite(altura) || altura <= 0) {
        throw new TypeError("Informe largura e altura válidas para a área de desenho.");
    }

    const tamanhoCelula = opcoes.tamanhoCelula ??
        Math.min(largura / cenario.largura, altura / cenario.altura);

    if (!Number.isFinite(tamanhoCelula) || tamanhoCelula <= 0) {
        throw new TypeError("O tamanho da célula deve ser positivo.");
    }

    const larguraMundo = cenario.largura * tamanhoCelula;
    const alturaMundo = cenario.altura * tamanhoCelula;
    const deslocamentoX = (largura - larguraMundo) / 2;
    const deslocamentoY = (altura - alturaMundo) / 2;

    contexto.clearRect?.(0, 0, largura, altura);
    contexto.fillStyle = "#101312";
    contexto.fillRect(0, 0, largura, altura);

    for (let y = 0; y < cenario.altura; y += 1) {
        for (let x = 0; x < cenario.largura; x += 1) {
            const tipo = cenario.terreno[y][x];
            const px = deslocamentoX + x * tamanhoCelula;
            const py = deslocamentoY + y * tamanhoCelula;

            contexto.fillStyle = CORES_TERRENO[tipo];
            contexto.fillRect(px, py, tamanhoCelula, tamanhoCelula);

            // Pequena borda discreta para deixar as células legíveis durante o protótipo.
            contexto.strokeStyle = "rgba(0, 0, 0, 0.08)";
            contexto.lineWidth = 1;
            contexto.strokeRect?.(px, py, tamanhoCelula, tamanhoCelula);
        }
    }

    for (const objeto of cenario.objetos ?? []) {
        desenharObjeto(contexto, objeto, tamanhoCelula, deslocamentoX, deslocamentoY);
    }

    return {
        deslocamentoX,
        deslocamentoY,
        tamanhoCelula,
        larguraMundo,
        alturaMundo
    };
}

function desenharObjeto(contexto, objeto, tamanhoCelula, deslocamentoX, deslocamentoY) {
    if (!objeto || !Number.isFinite(objeto.x) || !Number.isFinite(objeto.y)) {
        return;
    }

    const x = deslocamentoX + objeto.x * tamanhoCelula;
    const y = deslocamentoY + objeto.y * tamanhoCelula;
    const largura = (objeto.largura ?? 1) * tamanhoCelula;
    const altura = (objeto.altura ?? 1) * tamanhoCelula;

    switch (objeto.tipo) {
        case "arvore": {
            contexto.fillStyle = "#4b3424";
            contexto.fillRect(
                x + tamanhoCelula * 0.42,
                y + tamanhoCelula * 0.48,
                tamanhoCelula * 0.16,
                tamanhoCelula * 0.42
            );
            contexto.fillStyle = "#234f31";
            contexto.beginPath?.();
            contexto.arc?.(
                x + tamanhoCelula / 2,
                y + tamanhoCelula * 0.42,
                tamanhoCelula * 0.39,
                0,
                Math.PI * 2
            );
            contexto.fill?.();
            break;
        }

        case "pedra":
            contexto.fillStyle = "#a0a5a3";
            contexto.beginPath?.();
            contexto.ellipse?.(
                x + tamanhoCelula / 2,
                y + tamanhoCelula * 0.62,
                tamanhoCelula * 0.31,
                tamanhoCelula * 0.22,
                -0.2,
                0,
                Math.PI * 2
            );
            contexto.fill?.();
            break;

        case "casa":
            contexto.fillStyle = "#8d5b3c";
            contexto.fillRect(x, y + altura * 0.25, largura, altura * 0.75);
            contexto.fillStyle = "#633b32";
            contexto.beginPath?.();
            contexto.moveTo?.(x - largura * 0.08, y + altura * 0.28);
            contexto.lineTo?.(x + largura / 2, y);
            contexto.lineTo?.(x + largura * 1.08, y + altura * 0.28);
            contexto.closePath?.();
            contexto.fill?.();
            contexto.fillStyle = "#33271f";
            contexto.fillRect(
                x + largura * 0.42,
                y + altura * 0.58,
                largura * 0.16,
                altura * 0.42
            );
            break;

        default:
            // Tipos de objeto desconhecidos são ignorados para facilitar expansão dos dados.
            break;
    }
}
