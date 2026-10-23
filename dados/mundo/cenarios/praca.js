
export const cenarioPraca = {
    localId: "praca",
    nome: "Praça",

    largura: 16,
    altura: 12,

    terreno: [
        ["grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "terra", "terra", "terra", "terra", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "terra", "terra", "terra", "terra", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "terra", "terra", "terra", "terra", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "terra", "terra", "terra", "terra", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "terra", "terra", "terra", "terra", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama"],
        ["grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama", "grama"]
    ],

    terrenosBloqueados: ["agua", "pedra"],

    objetos: [
        { tipo: "arvore", x: 1, y: 1 },
        { tipo: "arvore", x: 3, y: 2 },
        { tipo: "arvore", x: 14, y: 1 },
        { tipo: "arvore", x: 13, y: 9 },
        { tipo: "pedra", x: 2, y: 8 },
        { tipo: "casa", x: 10, y: 3, largura: 3, altura: 3 }
    ],

    entradas: [
    {
        x: 11,
        y: 6,
        tipoTransicao: "automatica",
        destino: "taverna",
        posicaoChegada: {
            x: 8,
            y: 9
        }
    }
],

    criaturas: [
        {
            id: "lobo-01",
            monstroId: "lobo-da-floresta",
            x: 8,
            y: 4
        }
    ]
};
