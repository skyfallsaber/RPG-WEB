/**
 * Exemplo de dados para um cenário de exploração.
 *
 * Regra do projeto: os dados definem o que existe; o código define como funciona.
 * Este arquivo descreve apenas o cenário. Não contém lógica de desenho ou movimento.
 *
 * Cada célula equivale a uma unidade lógica de terreno.
 * Tipos aceitos pelo renderizador:
 *   terreno: "grama" | "terra" | "pedra" | "agua"
 *   objeto: "arvore" | "pedra" | "casa" | null
 *
 * Antes de usar no jogo, ajuste `localId` para corresponder exatamente ao ID
 * do local existente em dados/mundo/locais/.
 */

export const cenarioExemplo = {
    id: "cenario-exemplo-praca",
    localId: "AJUSTAR-ID-DO-LOCAL",
    nome: "Praça de exemplo",
    largura: 16,
    altura: 12,
    tamanhoCelula: 32,

    // Cada linha deve ter exatamente `largura` células.
    terreno: [
        ["grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","terra","terra","terra","terra","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","terra","terra","terra","terra","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","terra","terra","terra","terra","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","terra","terra","terra","terra","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","terra","terra","terra","terra","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","terra","terra","terra","terra","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","terra","terra","terra","terra","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama"],
        ["grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama","grama"]
    ],

    // Objetos usam coordenadas de célula, começando em zero.
    objetos: [
        { tipo: "arvore", x: 1, y: 1 },
        { tipo: "arvore", x: 3, y: 2 },
        { tipo: "arvore", x: 14, y: 1 },
        { tipo: "arvore", x: 13, y: 9 },
        { tipo: "pedra", x: 2, y: 8 },
        { tipo: "casa", x: 10, y: 3, largura: 3, altura: 3 }
    ]
};
