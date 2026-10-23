
const TIPOS_BLOQUEADOS = new Set([
    "arvore",
    "pedra",
    "casa",
    "parede",
    "mesa",
    "banco",
    "balcao",
    "prateleira",
    "barril"
]);

/**
 * Informa se uma coordenada está dentro dos limites do cenário.
 */
export function estaDentroDoCenario(cenario, x, y) {
    return (
        Number.isInteger(x) &&
        Number.isInteger(y) &&
        x >= 0 &&
        x < cenario.largura &&
        y >= 0 &&
        y < cenario.altura
    );
}

/**
 * Verifica se um objeto ocupa determinada célula.
 *
 * Objetos sem dimensões ocupam uma célula.
 * Objetos com largura e altura ocupam toda a área informada.
 */
function objetoOcupaCelula(objeto, x, y) {
    const largura = objeto.largura ?? 1;
    const altura = objeto.altura ?? 1;

    return (
        x >= objeto.x &&
        x < objeto.x + largura &&
        y >= objeto.y &&
        y < objeto.y + altura
    );
}

/**
 * Verifica se uma posição está bloqueada por terreno ou objeto.
 */
export function posicaoBloqueada(cenario, x, y) {
    if (!estaDentroDoCenario(cenario, x, y)) {
        return true;
    }

    const terreno = cenario.terreno[y]?.[x];
    const terrenosBloqueados = cenario.terrenosBloqueados ?? [];

    if (terreno === undefined || terrenosBloqueados.includes(terreno)) {
        return true;
    }

    const objetos = cenario.objetos ?? [];

    return objetos.some((objeto) => {
        const bloqueiaMovimento =
            objeto.bloqueiaMovimento === true ||
            TIPOS_BLOQUEADOS.has(objeto.tipo);

        return (
            bloqueiaMovimento &&
            objetoOcupaCelula(objeto, x, y)
        );
    });
}
