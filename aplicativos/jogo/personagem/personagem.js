import {
    progressaoPersonagem,
    calcularLimiteAtributo
} from "../../../configuracoes/progressao/personagem.js";
import { criarMaestrias } from "../atributos/maestria.js";

const ATRIBUTOS = [
    "forca",
    "destreza",
    "agilidade",
    "constituicao",
    "inteligencia",
    "sabedoria",
    "carisma",
    "sorte"
];

export function criarAtributosIniciais() {
    return {
        forca: 0,
        destreza: 0,
        agilidade: 0,
        constituicao: 0,
        inteligencia: 0,
        sabedoria: 0,
        carisma: 0,
        sorte: 0
    };
}

export function calcularPontosUsados(atributos) {
    return Object.values(atributos)
        .reduce((total, valor) => total + valor, 0);
}

export function alterarAtributo(
    atributos,
    atributo,
    quantidade,
    nivel = progressaoPersonagem.nivel.nivelInicial
) {

    if (!ATRIBUTOS.includes(atributo)) {
        return {
            sucesso: false,
            mensagem: "Atributo inválido."
        };
    }

    const novoValor = atributos[atributo] + quantidade;

    if (novoValor < 0) {
        return {
            sucesso: false,
            mensagem: "O atributo não pode ser menor que 0."
        };
    }

    const limiteAtributo =
    calcularLimiteAtributo(nivel);

if (novoValor > limiteAtributo) {
    return {
        sucesso: false,
        mensagem:
            `O atributo não pode ultrapassar ${limiteAtributo} neste nível.`
    };
}

    const pontosUsados = calcularPontosUsados(atributos);

    if (quantidade > 0 && pontosUsados >= progressaoPersonagem.criacao.pontosIniciais) {
        return {
            sucesso: false,
            mensagem: "Todos os pontos iniciais já foram utilizados."
        };
    }

    atributos[atributo] = novoValor;

    return {
        sucesso: true,
        atributos
    };
}


export function validarCriacao(nome, atributos) {
    if (typeof nome !== "string" || nome.trim() === "") {
        return {
            valido: false,
            mensagem: "O personagem precisa possuir um nome."
        };
    }

    if (
        !atributos ||
        typeof atributos !== "object" ||
        Array.isArray(atributos)
    ) {
        return {
            valido: false,
            mensagem: "Os atributos do personagem são inválidos."
        };
    }

    const chaves = Object.keys(atributos);

    if (
        chaves.length !== ATRIBUTOS.length ||
        !ATRIBUTOS.every(atributo =>
            Object.hasOwn(atributos, atributo)
        )
    ) {
        return {
            valido: false,
            mensagem: "A lista de atributos está incompleta ou contém atributos inválidos."
        };
    }

    const limite = calcularLimiteAtributo(
        progressaoPersonagem.nivel.nivelInicial
    );

    for (const atributo of ATRIBUTOS) {
        const valor = atributos[atributo];

        if (
            !Number.isInteger(valor) ||
            valor < 0 ||
            valor > limite
        ) {
            return {
                valido: false,
                mensagem: `O atributo ${atributo} deve ser um número inteiro entre 0 e ${limite}.`
            };
        }
    }

    const pontosUsados = calcularPontosUsados(atributos);

    if (pontosUsados !== progressaoPersonagem.criacao.pontosIniciais) {
        return {
            valido: false,
            mensagem: `O personagem precisa utilizar exatamente ${progressaoPersonagem.criacao.pontosIniciais} pontos.`
        };
    }

    return { valido: true };
}


export function criarPersonagem(nome, atributos) {

    const validacao = validarCriacao(nome, atributos);

    if (!validacao.valido) {
        return {
            sucesso: false,
            mensagem: validacao.mensagem
        };
    }

    return {
        sucesso: true,
        personagem: {
            nome: nome.trim(),

             nivel: progressaoPersonagem.nivel.nivelInicial,

             xp: progressaoPersonagem.nivel.xpInicial,

             classe: null,

             atributos: { ...atributos },

             maestrias: criarMaestrias(),
             localizacao: {
             regiaoId: "regiao-inicial",
             cidadeId: "cidade-inicial",
             localId: "praca"
             }
        }
    };
}