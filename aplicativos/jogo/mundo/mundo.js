import {
    regioes,
    cidades,
    locais
} from "../../../dados/mundo/indice.js";


export const mundo = {
    regioes,
    cidades,
    locais
};


export function obterRegiao(id) {

    return mundo.regioes.find(
        regiao => regiao.id === id
    ) || null;
}


export function obterCidade(id) {

    return mundo.cidades.find(
        cidade => cidade.id === id
    ) || null;
}


export function obterLocal(id) {

    return mundo.locais.find(
        local => local.id === id
    ) || null;
}
export function obterDestino(conexao) {

    if (!conexao) {
        return null;
    }

    if (conexao.tipo === "local") {
        return obterLocal(conexao.destino);
    }

    if (conexao.tipo === "cidade") {
        return obterCidade(conexao.destino);
    }

    if (conexao.tipo === "regiao") {
        return obterRegiao(conexao.destino);
    }

    return null;
}


export function obterLocaisDaCidade(cidadeId) {

    return mundo.locais.filter(
        local => local.cidadeId === cidadeId
    );
}


export function obterLocalInicial() {

    return obterLocal("praca");
}
export function obterLocaisConectados(localId) {

    const localAtual =
        obterLocal(localId);

    if (!localAtual) {
        return [];
    }

    return localAtual.conexoes
        .map(conexao => {

            return obterDestino(conexao);

        })
        .filter(destino => destino !== null);
}
