import { configuracaoMaestria } from "../../../configuracoes/progressao/maestria.js";
import {
    calcularLimiteAtributo
} from "../../../configuracoes/progressao/personagem.js";

export function criarMaestrias() {
    return {
        forca: {
            xp: 0,
            pontosAcumulados: 0
        },

        destreza: {
            xp: 0,
            pontosAcumulados: 0
        },

        agilidade: {
            xp: 0,
            pontosAcumulados: 0
        },

        constituicao: {
            xp: 0,
            pontosAcumulados: 0
        },

        inteligencia: {
            xp: 0,
            pontosAcumulados: 0
        },

        sabedoria: {
            xp: 0,
            pontosAcumulados: 0
        },

        carisma: {
            xp: 0,
            pontosAcumulados: 0
        },

        sorte: {
            xp: 0,
            pontosAcumulados: 0
        }
    };
}

export function adicionarExperienciaMaestria(
    maestrias,
    atributo,
    quantidade = configuracaoMaestria.xpPorAcao
) {
    
    if (
        !Number.isFinite(quantidade) ||
        quantidade <= 0
    ) {
        return {
            sucesso: false,
            mensagem: "A quantidade de experiência deve ser maior que 0."
        };
    }

    if (!(atributo in maestrias)) {
        return {
            sucesso: false,
            mensagem: "Atributo inválido."
        };
    }

    const maestria = maestrias[atributo];

    const xpAnterior = maestria.xp;

    maestria.xp += quantidade;

    const pontosAntes =
        Math.floor(
            xpAnterior /
            configuracaoMaestria.xpPorPonto
        );

    const pontosDepois =
        Math.floor(
            maestria.xp /
            configuracaoMaestria.xpPorPonto
        );

    const novosPontos =
        pontosDepois - pontosAntes;

    maestria.pontosAcumulados += novosPontos;

    return {
        sucesso: true,
        experiencia: maestria.xp,
        pontosAcumulados: maestria.pontosAcumulados
    };
}

export function calcularPontosDeMaestria(
    experiencia
) {
    return Math.floor(
        experiencia /
        configuracaoMaestria.xpPorPonto
    );
}
export function aplicarPontosDeMaestria(
    atributos,
    maestrias,
    nivel
) {
    const limite = calcularLimiteAtributo(nivel);

    for (const atributo in atributos) {
        const maestria = maestrias[atributo];

        while (
            maestria.pontosAcumulados > 0 &&
            atributos[atributo] < limite
        ) {
            atributos[atributo] += 1;
            maestria.pontosAcumulados -= 1;
        }
    }

    return {
        sucesso: true,
        atributos,
        maestrias
    };
}