# Estrutura do Projeto — RPG Web V1

## 1. Objetivo deste documento

Este documento descreve a organização do RPG Web, a responsabilidade de cada pasta e arquivo e as relações entre os principais módulos.

O objetivo é facilitar a manutenção, a evolução e a compreensão do projeto sem exigir a leitura de todo o código-fonte.

## 2. Princípio arquitetural

O projeto segue o princípio:

> **O código define como funciona; os dados definem o que existe no jogo.**

Na prática:

- **Código:** implementa regras, cálculos, validações, navegação, combate e comportamento das telas.
- **Dados:** definem monstros, regiões, cidades e locais disponíveis no mundo.
- **Configurações:** centralizam parâmetros ajustáveis, como regras de progressão e experiência.
- **Interface:** apresenta informações ao jogador e recebe suas ações.
- **Testes:** verificam se o comportamento esperado continua funcionando.

As responsabilidades devem permanecer separadas sempre que possível.

## 3. Visão geral das pastas

| Pasta | Responsabilidade |
|---|---|
| `aplicativos/jogo/` | Regras e sistemas que implementam o funcionamento do jogo. |
| `aplicativos/servidor/` | Inicialização e funcionamento do servidor web. |
| `aplicativos/web/` | Páginas, estilos, scripts e imagens da interface. |
| `configuracoes/` | Parâmetros utilizados pelas regras do jogo. |
| `dados/` | Conteúdo que existe no mundo do jogo. |
| `documentacao/` | Documentos sobre a arquitetura e os sistemas. |
| `testes/` | Testes automatizados dos módulos. |

## 4. Arquivos da raiz do projeto

### `.env`

Arquivo destinado a variáveis de ambiente e configurações locais que não devem ser fixadas diretamente no código.

Informações sensíveis não devem ser publicadas no repositório.

### `.gitignore`

Define quais arquivos e pastas o Git deve ignorar, evitando que arquivos temporários, dependências ou configurações locais sejam adicionados acidentalmente ao controle de versão.

### `package.json`

Arquivo de configuração do projeto Node.js.

Registra informações do projeto e os comandos npm disponíveis, incluindo o comando utilizado para iniciar o servidor e, quando configurado, executar os testes.

### `README.md`

Documento de entrada do projeto.

Deve apresentar o RPG Web, os requisitos, as instruções de instalação e execução e os links para a documentação mais detalhada.

### `estrutura jogo.txt`

Arquivo auxiliar existente na raiz. Seu conteúdo deve ser consultado para determinar se representa uma versão anterior ou complementar do mapa da estrutura.

Se duplicar informações mantidas na documentação oficial, considerar sua atualização ou substituição de forma consciente.

## 5. Aplicativos e sistemas do jogo

### 5.1. `aplicativos/jogo/atributos/`

#### `maestria.js`

Implementa operações relacionadas às maestrias do personagem, como sua criação e organização.

As regras específicas e a forma de evolução das maestrias devem ser consultadas no código e nas configurações de progressão correspondentes.

### 5.2. `aplicativos/jogo/combate/`

Contém os módulos responsáveis pelo funcionamento do combate.

#### `combate.js`

Implementa as operações centrais do combate, incluindo sua inicialização e a execução das ações dos combatentes.

É um dos módulos centrais das regras de batalha.

#### `fluxoCombate.js`

Coordena o andamento dos turnos e determina qual etapa do combate deve ser executada.

Também integra o fluxo normal de batalha com o processamento dos resultados, como a derrota.

#### `regras.js`

Concentra cálculos e regras de combate, incluindo o cálculo de estatísticas utilizadas na batalha e a determinação do dano.

Separar esses cálculos evita que todas as regras fiquem concentradas na interface ou no controle dos turnos.

#### `recompensas.js`

Responsável pela concessão das recompensas de vitória.

No combate atual, integra a recompensa de experiência com o sistema de armazenamento e progressão do personagem e controla a concessão para evitar recebimentos duplicados no mesmo combate.

#### `resultadoCombate.js`

Responsável pelo processamento dos resultados do combate, incluindo o tratamento da derrota e o retorno do personagem à localização prevista para esse resultado.

Esse módulo separa as consequências do encerramento da batalha das operações que executam cada turno.

### 5.3. `aplicativos/jogo/mundo/`

Contém a lógica de funcionamento e navegação pelo mundo.

#### `mundo.js`

Implementa operações relacionadas ao estado ou à consulta do mundo do jogo.

Sua responsabilidade específica deve ser entendida em conjunto com os dados do mundo e os módulos de navegação.

#### `navegacao.js`

Implementa as operações de navegação entre os locais disponíveis.

Deve utilizar as informações de conexões e destinos definidos nos dados, evitando duplicar a descrição do mundo dentro da lógica de navegação.

### 5.4. `aplicativos/jogo/personagem/`

Contém os módulos responsáveis pelo personagem do jogador.

#### `personagem.js`

Implementa a criação e as regras fundamentais do personagem, incluindo a estrutura dos atributos e suas validações.

É o módulo de referência para a estrutura lógica do personagem.

#### `armazenamento.js`

Gerencia a persistência e a recuperação dos dados do personagem.

Entre suas responsabilidades estão carregar e salvar o personagem, remover os dados armazenados e integrar operações de experiência e maestria com a progressão.

A persistência atual utiliza o armazenamento local do navegador.

#### `progressao.js`

Implementa as regras de evolução do personagem, como o processamento da experiência e a progressão de nível.

Deve trabalhar em conjunto com as configurações de progressão, mantendo os parâmetros separados da lógica que os utiliza.

## 6. Servidor

### `aplicativos/servidor/index.js`

Ponto de entrada do servidor web.

É responsável por iniciar o servidor e disponibilizar os recursos da aplicação conforme as rotas e configurações implementadas.

A interface acessa esses recursos por meio do endereço local utilizado durante o desenvolvimento.

## 7. Interface web

### 7.1. `aplicativos/web/index.html`

Página HTML de entrada da aplicação web.

Seu comportamento e sua relação com as demais telas devem ser consultados no próprio arquivo e nas rotas disponibilizadas pelo servidor.

### 7.2. `aplicativos/web/telas/`

Contém as páginas HTML que representam as diferentes telas do jogo.

#### `inicio.html`

Apresenta a visão geral da aventura e os acessos às funcionalidades disponíveis na tela inicial.

#### `criacao-personagem.html`

Oferece a interface de criação do personagem e coleta as informações necessárias para iniciar a jornada.

#### `personagem.html`

Apresenta a ficha do personagem, seus atributos, sua progressão e outras informações relacionadas à sua evolução.

#### `combate.html`

Apresenta a arena de combate, as informações dos combatentes, as barras de vida, as ações disponíveis e o registro dos acontecimentos da batalha.

#### `mapa.html`

Representa a interface de exploração geográfica do mundo.

A tela deve apresentar as informações de localização e navegação utilizando os dados e as regras correspondentes do mundo.

### 7.3. `aplicativos/web/estilos/`

Contém os arquivos CSS que controlam a aparência das telas.

#### `inicio.css`

Define os estilos da interface inicial e de seus elementos visuais.

#### `inicio-menu.css`

Define os estilos relacionados ao menu da interface inicial.

#### `criacao-personagem.css`

Controla a apresentação visual da tela de criação de personagem.

#### `personagem.css`

Controla a aparência da ficha e das informações de progressão do personagem.

#### `combate.css`

Define a aparência da arena de combate, dos painéis dos combatentes, das barras de vida, dos botões e do histórico de batalha.

#### `mapa.css`

Define a apresentação visual da interface de mapa e de seus elementos.

### 7.4. `aplicativos/web/scripts/`

Contém os scripts JavaScript responsáveis pela interação da interface com os sistemas do jogo.

#### `combate.js`

Coordena a interação da tela de combate com os módulos de personagem e combate.

É responsável por preparar a batalha, atualizar as informações exibidas, responder às ações do jogador, apresentar o histórico e tratar os estados de vitória e derrota na interface.

As regras efetivas do combate devem permanecer nos módulos de lógica correspondentes, não concentradas neste script.

### 7.5. `aplicativos/web/imagens/`

Contém recursos visuais utilizados pela interface.

#### `personagem-retrato.png`

Imagem de retrato do personagem utilizada pela interface. O local exato em que aparece depende de como ela é referenciada pelos arquivos HTML e JavaScript.

## 8. Configurações

### 8.1. `configuracoes/progressao/`

Contém parâmetros utilizados nos sistemas de evolução.

#### `personagem.js`

Define as configurações relacionadas à progressão do personagem, como parâmetros de evolução e limites de atributos.

#### `maestria.js`

Define os parâmetros de progressão das maestrias, mantendo esses valores separados das operações que implementam sua evolução.

## 9. Dados do jogo

A pasta `dados/` contém informações que definem o conteúdo disponível no jogo.

### 9.1. `dados/monstros/`

#### `lobo-da-floresta.js`

Define os dados do monstro Lobo da Floresta, incluindo suas características de combate e a recompensa associada à sua derrota.

#### `indice.js`

Centraliza o acesso aos monstros registrados, permitindo que outros módulos consultem um monstro pelo seu identificador.

### 9.2. `dados/mundo/`

Contém os dados que descrevem a organização geográfica do mundo.

#### `indice.js`

Centraliza o acesso aos dados registrados do mundo, conforme a organização implementada no módulo.

#### `cidades/cidade-inicial.js`

Define os dados da cidade inicial.

#### `regioes/regiao-inicial.js`

Define os dados da região inicial, que organiza parte do mundo do jogo.

#### `locais/praca.js`

Define os dados da praça.

#### `locais/taverna.js`

Define os dados da taverna.

#### `locais/loja.js`

Define os dados da loja.

#### `locais/estrada-inicial.js`

Define os dados da estrada inicial.

#### `locais/floresta-inicial.js`

Define os dados da floresta inicial.

#### `locais/saida-cidade.js`

Define os dados do local relacionado à saída da cidade.

Os dados de cada local devem ser interpretados em conjunto com o índice do mundo e com o sistema de navegação. A existência de um local nos dados não significa, por si só, que todas as funcionalidades associadas a ele já estejam implementadas.

## 10. Documentação existente

### `documentacao/sistemas/personagem-v1.md`

Documento dedicado ao sistema de personagem da V1.

Deve continuar sendo a referência detalhada para criação, atributos, armazenamento e progressão do personagem, complementando este mapa geral.

Os documentos específicos de combate, mundo, interface e testes devem seguir a mesma organização por responsabilidade.

## 11. Testes automatizados

A pasta `testes/` contém verificações automatizadas dos sistemas.

### `combate_test.js`

Verifica o comportamento das operações centrais do combate e as regras cobertas pelos casos de teste desse módulo.

### `fluxoCombate_test.js`

Verifica o fluxo dos turnos e as transições de estado do combate contempladas nos testes.

### `resultadoCombate_test.js`

Verifica o processamento dos resultados do combate, incluindo os cenários de encerramento cobertos pelos testes.

### `personagem_test.js`

Verifica as regras do personagem, como criação, validação, armazenamento e progressão nos cenários implementados.

Os testes ajudam a detectar regressões quando um sistema é alterado. A presença de um teste não significa que todos os casos possíveis já estejam cobertos.

## 12. Relação entre os principais módulos

### Combate

O funcionamento do combate pode ser entendido em etapas:

1. A interface prepara o combate e solicita os dados do personagem e do monstro.
2. O módulo de combate inicializa o estado da batalha.
3. O fluxo de combate coordena os turnos.
4. As regras de combate calculam as estatísticas e os danos necessários.
5. O resultado da batalha é processado quando ocorre vitória ou derrota.
6. Na vitória, o módulo de recompensas integra a concessão de experiência à progressão do personagem.
7. A interface atualiza as barras de vida, o estado da batalha e o registro de combate.

### Personagem

O sistema de personagem separa responsabilidades:

- A criação e as validações ficam no módulo de personagem.
- A persistência fica no armazenamento.
- As regras de evolução ficam na progressão.
- Os parâmetros de evolução ficam nas configurações.
- A interface apresenta os dados e permite as interações disponíveis.

### Mundo

O mundo separa o conteúdo das regras:

- Os dados definem regiões, cidades e locais.
- Os índices centralizam o acesso aos dados registrados.
- Os módulos de mundo e navegação implementam as operações correspondentes.
- As telas apresentam as informações ao jogador.

## 13. Regras para manutenção da arquitetura

Ao adicionar ou modificar funcionalidades:

1. Identificar qual sistema é responsável pela funcionalidade.
2. Manter os dados do jogo separados das regras que os utilizam.
3. Evitar duplicar a mesma regra em diferentes módulos.
4. Manter a interface responsável pela apresentação e pela interação, delegando as regras aos módulos do jogo.
5. Atualizar os testes relacionados às regras modificadas.
6. Atualizar a documentação quando a responsabilidade de um arquivo mudar ou um novo arquivo for criado.
7. Não documentar funcionalidades futuras como se já estivessem implementadas.

## 14. Como manter este documento atualizado

Sempre que a estrutura do projeto mudar:

- Adicionar os novos arquivos à seção correspondente.
- Atualizar a descrição dos arquivos modificados.
- Remover ou marcar arquivos que deixarem de existir.
- Conferir se os caminhos descritos correspondem ao repositório.
- Manter os detalhes de cada sistema nos documentos específicos, evitando transformar este mapa em uma cópia integral do código-fonte.
