export const progressaoPersonagem = {
    criacao: {
        pontosIniciais: 40,
        limiteInicial: 12
    },

    nivel: {
        nivelInicial: 1,
        xpInicial: 0,
        xpPorNivel: 1000
    },

    atributos: {
        aumentoLimite: 4
    }
};

export function calcularLimiteAtributo(nivel) {
    const nivelAtual = Math.max(
        progressaoPersonagem.nivel.nivelInicial,
        nivel
    );

    return (
        progressaoPersonagem.criacao.limiteInicial +
        (nivelAtual - 1) *
        progressaoPersonagem.atributos.aumentoLimite
    );
}

export function calcularXpParaProximoNivel(nivel) {
    const nivelAtual = Math.max(
        progressaoPersonagem.nivel.nivelInicial,
        nivel
    );

    return (
        nivelAtual *
        progressaoPersonagem.nivel.xpPorNivel
    );
}