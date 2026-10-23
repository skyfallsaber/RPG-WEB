
import { cenarioPraca } from "./praca.js";
import { cenarioTaverna } from "./taverna.js";

export const cenarios = [
    cenarioPraca,
    cenarioTaverna
];

export function obterCenario(localId) {
    return cenarios.find(
        (cenario) => cenario.localId === localId
    ) ?? null;
}
