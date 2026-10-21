export function calcularEstatisticasPersonagem(personagem) {
    const atributos = personagem?.atributos;

    if (
        !atributos ||
        !Number.isInteger(atributos.forca) ||
        !Number.isInteger(atributos.constituicao) ||
        !Number.isInteger(atributos.agilidade) ||
        atributos.forca < 0 ||
        atributos.constituicao < 0 ||
        atributos.agilidade < 0
    ) {
        return {
            sucesso: false,
            mensagem: "Atributos do personagem inválidos."
        };
    }

    const vidaMaxima = 20 + atributos.constituicao * 10;

    return {
        sucesso: true,
        estatisticas: {
            vida: vidaMaxima,
            vidaMaxima,
            ataque: 5 + atributos.forca * 2,
            defesa: Math.floor(atributos.constituicao / 2),
            agilidade: atributos.agilidade
        }
    };
}

export function calcularDano(ataque, defesa) {
    if (
        !Number.isFinite(ataque) ||
        !Number.isFinite(defesa) ||
        ataque < 0 ||
        defesa < 0
    ) {
        return {
            sucesso: false,
            mensagem: "Valores de ataque ou defesa inválidos."
        };
    }

    return {
        sucesso: true,
        dano: Math.max(1, ataque - defesa)
    };
}