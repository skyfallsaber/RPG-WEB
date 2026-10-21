import {
    loboDaFloresta
} from "./lobo-da-floresta.js";

export const monstros = {
    [loboDaFloresta.id]: loboDaFloresta
};

export function obterMonstro(monstroId) {
    return monstros[monstroId] ?? null;
}