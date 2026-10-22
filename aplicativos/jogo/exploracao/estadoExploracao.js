/**
 * Estado e persistência da exploração 2D.
 *
 * Mantém as coordenadas por local separadas dos dados do personagem e do mundo.
 * Este módulo não controla movimento, colisões, renderização ou encontros.
 */

export const CHAVE_ESTADO_EXPLORACAO = "rpg_web_exploracao_v1";

function validarLocalId(localId) {
    if (typeof localId !== "string" || localId.trim() === "") {
        throw new TypeError("O ID do local deve ser uma string não vazia.");
    }

    return localId;
}

function validarPosicao(posicao, nome = "posição") {
    if (
        !posicao ||
        typeof posicao !== "object" ||
        !Number.isFinite(posicao.x) ||
        !Number.isFinite(posicao.y) ||
        posicao.x < 0 ||
        posicao.y < 0
    ) {
        throw new TypeError(
            `A ${nome} deve conter coordenadas x e y numéricas, finitas e não negativas.`
        );
    }

    return { x: posicao.x, y: posicao.y };
}

function obterArmazenamento(armazenamento) {
    const destino = armazenamento ?? globalThis.localStorage;

    if (
        !destino ||
        typeof destino.getItem !== "function" ||
        typeof destino.setItem !== "function"
    ) {
        throw new Error("O armazenamento local não está disponível.");
    }

    return destino;
}

function lerDados(armazenamento) {
    const destino = obterArmazenamento(armazenamento);
    const conteudo = destino.getItem(CHAVE_ESTADO_EXPLORACAO);

    if (!conteudo) {
        return {};
    }

    let dados;

    try {
        dados = JSON.parse(conteudo);
    } catch {
        return {};
    }

    if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
        return {};
    }

    const posicoesValidas = {};

    for (const [localId, posicao] of Object.entries(dados)) {
        if (
            localId.trim() !== "" &&
            posicao &&
            typeof posicao === "object" &&
            Number.isFinite(posicao.x) &&
            Number.isFinite(posicao.y) &&
            posicao.x >= 0 &&
            posicao.y >= 0
        ) {
            posicoesValidas[localId] = {
                x: posicao.x,
                y: posicao.y
            };
        }
    }

    return posicoesValidas;
}

/**
 * Cria o estado em memória de uma exploração para um local.
 * Não salva automaticamente; a persistência é explícita.
 */
export function criarEstadoExploracao(localId, posicaoInicial) {
    return {
        localId: validarLocalId(localId),
        posicao: validarPosicao(posicaoInicial, "posição inicial")
    };
}

/**
 * Retorna uma cópia das posições salvas, indexadas pelo ID do local.
 */
export function carregarPosicoesExploracao(armazenamento) {
    return lerDados(armazenamento);
}

/**
 * Recupera a posição salva para o local ou usa a posição inicial informada.
 */
export function obterPosicaoLocal(localId, posicaoInicial, armazenamento) {
    validarLocalId(localId);
    const inicial = validarPosicao(posicaoInicial, "posição inicial");
    const posicoes = lerDados(armazenamento);

    return posicoes[localId] ?? inicial;
}

/**
 * Salva a última posição conhecida de um local sem afetar os demais.
 */
export function salvarPosicaoLocal(localId, posicao, armazenamento) {
    validarLocalId(localId);
    const posicaoValidada = validarPosicao(posicao);
    const destino = obterArmazenamento(armazenamento);
    const posicoes = lerDados(destino);

    posicoes[localId] = posicaoValidada;
    destino.setItem(CHAVE_ESTADO_EXPLORACAO, JSON.stringify(posicoes));

    return { ...posicaoValidada };
}
