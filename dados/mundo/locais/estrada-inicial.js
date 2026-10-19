
export const estradaInicial = {
    id: "estrada-inicial",
    nome: "Estrada Inicial",
    cidadeId: null,
    regiaoId: "regiao-inicial",
    descricao: "Uma estrada que se estende para além dos limites da cidade.",

    conexoes: [
    {
        destino: "saida-cidade",
        tipo: "local"
    },
    {
        destino: "floresta-inicial",
        tipo: "local"
    }
    ]
};

