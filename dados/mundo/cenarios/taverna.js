
export const cenarioTaverna = {
    localId: "taverna",
    nome: "Taverna",

    largura: 16,
    altura: 12,

    // Piso interno de madeira.
    terreno: Array.from(
        { length: 12 },
        (_, y) => Array.from(
            { length: 16 },
            (_, x) => {
                // Área central do salão.
                if (x >= 1 && x <= 14 && y >= 1 && y <= 10) {
                    return "madeira";
                }

                // Paredes externas.
                return "madeiraEscura";
            }
        )
    ),

    terrenosBloqueados: ["agua", "pedra"],

    objetos: [
        // Paredes laterais e parede superior.
        { tipo: "parede", x: 0, y: 0, largura: 16, altura: 1 },
        { tipo: "parede", x: 0, y: 1, largura: 1, altura: 10 },
        { tipo: "parede", x: 15, y: 1, largura: 1, altura: 10 },

        // Parede inferior dividida para deixar a porta no centro.
        { tipo: "parede", x: 0, y: 11, largura: 7, altura: 1 },
        { tipo: "parede", x: 9, y: 11, largura: 7, altura: 1 },

        // Porta de entrada e saída.
        { tipo: "porta", x: 7, y: 10, largura: 2, altura: 1 },

        // Balcão do taverneiro.
        { tipo: "balcao", x: 5, y: 2, largura: 6, altura: 1 },

        // Prateleiras atrás do balcão.
        { tipo: "prateleira", x: 6, y: 1, largura: 4, altura: 1 },

        // Mesas e bancos do salão.
        { tipo: "mesa", x: 2, y: 4, largura: 2, altura: 1 },
        { tipo: "banco", x: 2, y: 5, largura: 2, altura: 1 },

        { tipo: "mesa", x: 11, y: 4, largura: 2, altura: 1 },
        { tipo: "banco", x: 11, y: 5, largura: 2, altura: 1 },

        { tipo: "mesa", x: 3, y: 7, largura: 2, altura: 1 },
        { tipo: "banco", x: 3, y: 8, largura: 2, altura: 1 },

        { tipo: "mesa", x: 11, y: 7, largura: 2, altura: 1 },
        { tipo: "banco", x: 11, y: 8, largura: 2, altura: 1 },

        // Barris armazenados nos cantos.
        { tipo: "barril", x: 2, y: 2 },
        { tipo: "barril", x: 13, y: 2 },

        // Iluminação decorativa.
        { tipo: "tocha", x: 1, y: 3 },
        { tipo: "tocha", x: 14, y: 3 },
        { tipo: "tocha", x: 1, y: 8 },
        { tipo: "tocha", x: 14, y: 8 }
    ],

    entradas: [
    {
        x: 8,
        y: 10,
        tipoTransicao: "automatica",
        destino: "praca",
        posicaoChegada: {
            x: 11,
            y: 7
        }
    }
],

    criaturas: []
};
