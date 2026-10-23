
function validarCriatura(criatura, cenario) {
    if (!criatura || typeof criatura !== "object") {
        throw new TypeError("A criatura precisa ser um objeto.");
    }

    if (typeof criatura.id !== "string" || !criatura.id.trim()) {
        throw new TypeError("A criatura precisa ter um ID válido.");
    }

    if (
        typeof criatura.monstroId !== "string" ||
        !criatura.monstroId.trim()
    ) {
        throw new TypeError(
            `A criatura "${criatura.id}" precisa ter um monstroId válido.`
        );
    }

    if (
        !Number.isInteger(criatura.x) ||
        !Number.isInteger(criatura.y) ||
        criatura.x < 0 ||
        criatura.y < 0 ||
        criatura.x >= cenario.largura ||
        criatura.y >= cenario.altura
    ) {
        throw new TypeError(
            `A criatura "${criatura.id}" possui uma posição inválida.`
        );
    }
}

export function criarControladorCriaturas(cenario) {
    if (!cenario || typeof cenario !== "object") {
        throw new TypeError("É necessário fornecer um cenário válido.");
    }

    if (!Array.isArray(cenario.criaturas)) {
        throw new TypeError(
            "O cenário precisa possuir uma lista de criaturas."
        );
    }

    const ids = new Set();

    const criaturas = cenario.criaturas.map((criatura) => {
        validarCriatura(criatura, cenario);

        if (ids.has(criatura.id)) {
            throw new TypeError(
                `O ID de criatura "${criatura.id}" está duplicado.`
            );
        }

        ids.add(criatura.id);

        return {
            id: criatura.id,
            monstroId: criatura.monstroId,
            x: criatura.x,
            y: criatura.y
        };
    });

    return {
        
        mover(id, x, y) {
        const criatura = criaturas.find((item) => item.id === id);

            if (!criatura) {
            return false;
            }

            if (
                !Number.isInteger(x) ||
                !Number.isInteger(y) ||
                x < 0 ||
                y < 0 ||
                x >= cenario.largura ||
                y >= cenario.altura
            ) {
                return false;
            }

            criatura.x = x;
            criatura.y = y;

            return true;
        },
        listar() {
            return criaturas.map((criatura) => ({ ...criatura }));
        },

        obterPorId(id) {
            const criatura = criaturas.find(
                (item) => item.id === id
            );

            return criatura ? { ...criatura } : null;
        }
    };
}
