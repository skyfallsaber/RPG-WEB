
export const saidaCidade = {
    id: "saida-cidade",
    nome: "Saída da Cidade",
    cidadeId: "cidade-inicial",
    regiaoId: "regiao-inicial",
    descricao: "O caminho que leva para fora da cidade.",

    conexoes: [
        {
            destino: "praca",
            tipo: "local"
        },
        {
            destino: "estrada-inicial",
            tipo: "local"
        }
    ]
};

