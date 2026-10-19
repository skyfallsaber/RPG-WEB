import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pastaAplicativos = path.resolve(__dirname, "..");

const pastaWeb = path.join(
    pastaAplicativos,
    "web"
);

const pastaJogo = path.join(
    pastaAplicativos,
    "jogo"
);

const pastaConfiguracoes = path.resolve(
    pastaAplicativos,
    "..",
    "configuracoes"
);
const pastaDados = path.resolve(
    pastaAplicativos,
    "..",
    "dados"
);

const tiposMime = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
};

const servidor = http.createServer((requisicao, resposta) => {

    let caminhoRequisitado = requisicao.url;

    if (caminhoRequisitado === "/") {
        caminhoRequisitado = "/index.html";
    }

    let caminhoBase;

    if (caminhoRequisitado.startsWith("/jogo/")) {

    caminhoBase = pastaJogo;

    caminhoRequisitado =
        caminhoRequisitado.replace("/jogo", "");

} else if (
    caminhoRequisitado.startsWith("/configuracoes/")
) {

    caminhoBase = pastaConfiguracoes;

    caminhoRequisitado =
        caminhoRequisitado.replace(
            "/configuracoes",
            ""
        );

} else if (
    caminhoRequisitado.startsWith("/dados/")
) {

    caminhoBase = pastaDados;

    caminhoRequisitado =
        caminhoRequisitado.replace(
            "/dados",
            ""
        );

} else {

    caminhoBase = pastaWeb;

}

    const caminhoArquivo = path.join(
        caminhoBase,
        caminhoRequisitado
    );

    if (!fs.existsSync(caminhoArquivo)) {

        resposta.writeHead(404, {
            "Content-Type":
                "text/plain; charset=utf-8"
        });

        resposta.end("Página não encontrada.");

        return;
    }

    const arquivo = fs.readFileSync(
        caminhoArquivo
    );

    const extensao = path.extname(
        caminhoArquivo
    );

    const tipoMime =
        tiposMime[extensao] ||
        "application/octet-stream";

    resposta.writeHead(200, {
        "Content-Type": tipoMime
    });

    resposta.end(arquivo);
});

const PORTA = 3000;

servidor.listen(PORTA, () => {

    console.log(
        `RPG Web rodando em http://localhost:${PORTA}`
    );

});