
import {
    obterLocal,
    obterLocaisConectados
} from "./mundo.js";


export function obterLocalAtual(personagem) {

    if (!personagem || !personagem.localizacao) {
        return null;
    }

    return obterLocal(
        personagem.localizacao.localId
    );
}


export function obterDestinosPossiveis(personagem) {

    const localAtual =
        obterLocalAtual(personagem);

    if (!localAtual) {
        return [];
    }

    return obterLocaisConectados(
        localAtual.id
    );
}


export function podeMoverPara(
    personagem,
    destinoId
) {

    const destinos =
        obterDestinosPossiveis(personagem);

    return destinos.some(
        destino => destino.id === destinoId
    );
}


export function moverPersonagem(
    personagem,
    destinoId
) {

    if (!personagem || !personagem.localizacao) {

        return {
            sucesso: false,
            mensagem: "Personagem inválido."
        };

    }


    const destino =
        obterLocal(destinoId);


    if (!destino) {

        return {
            sucesso: false,
            mensagem: "Destino não encontrado."
        };

    }


    if (
        !podeMoverPara(
            personagem,
            destinoId
        )
    ) {

        return {
            sucesso: false,
            mensagem:
                "Esse destino não está conectado ao local atual."
        };

    }


    personagem.localizacao.localId =
        destino.id;


    personagem.localizacao.cidadeId =
        destino.cidadeId ?? null;


    personagem.localizacao.regiaoId =
        destino.regiaoId ?? null;


    return {
        sucesso: true,
        personagem,
        destino
    };

}

