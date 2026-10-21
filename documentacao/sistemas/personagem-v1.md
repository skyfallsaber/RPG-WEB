# Sistema de Personagem — RPG Web

**Versão da documentação:** V1  
**Status:** Sistema em desenvolvimento  
**Projeto:** RPG Web

## 1. Objetivo do sistema

O sistema de personagem deve permitir que o jogador desenvolva seu próprio estilo de jogo por meio da distribuição de atributos, da evolução individual de suas capacidades, da experiência adquirida e, futuramente, do desbloqueio de classes e habilidades.

O personagem não deve ser limitado a uma classe obrigatória escolhida no início. A proposta é permitir que cada jogador construa sua própria trajetória dentro do mundo.

**Princípio central:**

> O jogador constrói seu personagem. A classe é conquistada durante o jogo, não escolhida obrigatoriamente no início.

O sistema deve ser modular, expansível e preparado para receber novos atributos, habilidades, classes, equipamentos e formas de progressão sem exigir a reescrita de toda a estrutura.

## 2. Filosofia de desenvolvimento do personagem

O desenvolvimento do personagem deve seguir algumas diretrizes:

- Liberdade para desenvolver diferentes estilos de combate e exploração.
- Evolução gradual por experiência, prática e utilização das capacidades.
- Separação entre o nível geral do personagem e a maestria de cada atributo.
- Classes conquistadas por meio da progressão, e não impostas na criação.
- Possibilidade futura de combinar habilidades de diferentes áreas.
- Regras de jogo separadas dos dados que definem os conteúdos.
- Evolução planejada para permitir que o jogo cresça sem tornar a estrutura desorganizada.

As regras numéricas devem ser definidas de maneira explícita e testável. Ideias ainda não aprovadas não devem ser transformadas em regras definitivas apenas por estarem descritas nesta documentação.

## 3. Criação inicial do personagem

### 3.1. Estado inicial definido

O personagem começa com as seguintes características:

| Característica | Valor inicial |
|---|---:|
| Nível | 1 |
| Experiência | 0 XP |
| Classe | Nenhuma |
| Pontos para distribuir | 40 |
| Limite inicial por atributo | 12 |

O jogador distribui os 40 pontos entre os oito atributos disponíveis, respeitando o limite individual de 12 pontos durante a criação inicial.

A soma dos pontos distribuídos deve respeitar as regras de validação do sistema. Valores negativos, atributos acima do limite e distribuições inválidas não devem ser aceitos.

### 3.2. Atributos disponíveis

O personagem possui oito atributos principais:

1. **Força:** representa o potencial físico de força.
2. **Destreza:** representa a precisão e o controle dos movimentos.
3. **Agilidade:** representa a capacidade de movimentação e a velocidade.
4. **Constituição:** representa a resistência física.
5. **Inteligência:** representa capacidades intelectuais e conhecimentos.
6. **Sabedoria:** representa conhecimento prático, percepção e possíveis afinidades com natureza, cura ou energia.
7. **Carisma:** representa a capacidade de interação e influência social.
8. **Sorte:** representa a influência de fatores aleatórios em situações apropriadas.

Essas descrições representam a intenção de design. Os efeitos exatos de cada atributo nas fórmulas do jogo ainda precisam ser definidos e documentados conforme forem aprovados.

**Importante:** agilidade está associada à velocidade dentro do projeto, mas não se deve presumir que todos os seus efeitos numéricos já estejam definidos.

## 4. Sistema de atributos

Os atributos devem influenciar as capacidades do personagem durante a aventura.

Entre os efeitos possíveis estão:

- Dano físico.
- Precisão e eficiência de ataques.
- Velocidade de ação.
- Resistência a danos.
- Capacidade de sobrevivência.
- Eficiência em habilidades.
- Interações sociais.
- Resultados de atividades específicas.

Esses efeitos são possibilidades de design, não uma lista de fórmulas já implementadas.

Cada relação entre atributo e mecânica deve ser definida separadamente. Isso evita que uma alteração em um atributo provoque efeitos inesperados em sistemas independentes.

### 4.1. Limite de atributos

O sistema já possui uma configuração de progressão que determina o limite permitido para os atributos de acordo com as regras de evolução.

O limite inicial de 12 vale para a distribuição durante a criação do personagem. A evolução posterior deve obedecer às regras de progressão configuradas.

A progressão futura deverá estabelecer como o limite aumenta com os níveis e quais restrições se aplicam à evolução por maestria.

### 4.2. Atributos e características derivadas

Futuramente, os atributos poderão contribuir para características calculadas, como:

- Vida máxima.
- Dano.
- Defesa.
- Velocidade de combate.
- Precisão.
- Resistências.
- Recursos necessários para utilizar habilidades.

As fórmulas definitivas ainda devem ser decididas e testadas. Não se deve presumir que todos esses valores já fazem parte do sistema atual.

## 5. Sistema de maestria dos atributos

### 5.1. Conceito

Cada atributo possui uma progressão de maestria própria.

A proposta é que o personagem desenvolva suas capacidades ao utilizar, praticar ou exercitar atividades relacionadas a elas. Dessa forma, o desenvolvimento não depende exclusivamente de derrotar inimigos ou receber experiência geral.

Por exemplo, um personagem pode desenvolver sua força por meio de atividades físicas e combates, enquanto outro pode desenvolver mais sua inteligência por meio de atividades intelectuais.

### 5.2. Maestria e experiência geral

A experiência geral e a experiência de maestria são sistemas diferentes.

- **Experiência geral:** contribui para a progressão do nível do personagem.
- **Experiência de maestria:** contribui para o desenvolvimento individual de cada atributo.

Receber experiência geral não deve significar, automaticamente, que todos os atributos aumentem da mesma forma.

O sistema de personagem já possui integração com o armazenamento para adicionar experiência geral e experiência de maestria. Os critérios completos de concessão e os valores de progressão precisam seguir as configurações efetivamente implementadas.

### 5.3. Relação entre atividades e atributos

A intenção é permitir que diferentes ações contribuam para diferentes maestrias.

Exemplos conceituais:

| Atividade | Maestrias que podem ser relacionadas |
|---|---|
| Exercícios de força e esforço físico | Força e Constituição |
| Movimentos técnicos e ataques precisos | Destreza |
| Treinamento de movimentação | Agilidade |
| Estudos e resolução de problemas | Inteligência |
| Práticas relacionadas à natureza ou à cura | Sabedoria |
| Negociação e interação social | Carisma |
| Situações específicas de sorte | Sorte |

Essas relações são exemplos para orientar o design. A concessão efetiva de maestria deve ser definida por atividade, habilidade ou regra do sistema.

Uma mesma atividade poderá contribuir para mais de um atributo quando isso fizer sentido. No entanto, essa relação deverá ser explícita, evitando ganhos automáticos e indiscriminados.

### 5.4. Evolução por maestria

A proposta é que a maestria acumule experiência até atingir determinados requisitos para aumentar o atributo correspondente.

Ainda precisam ser definidos:

- Quantidade de experiência necessária por evolução.
- Se o custo aumenta a cada nível do atributo.
- Quantidade de maestria concedida por atividade.
- Limites de ganho por ação ou atividade repetida.
- Possíveis modificadores relacionados a habilidades e treinamento.
- Relação entre o nível do personagem e o limite de atributo.
- Como tratar a maestria quando o atributo atinge seu limite atual.

Esses valores devem ficar em configurações apropriadas, quando forem definidos, em vez de serem espalhados por diversos módulos.

## 6. Experiência e nível do personagem

O personagem começa no nível 1 com 0 XP.

A experiência geral representa a progressão do personagem ao longo da aventura. O combate já possui integração com a concessão de experiência após uma vitória válida.

O sistema de armazenamento também possui uma operação para adicionar experiência ao personagem e retornar informações como experiência total, nível e níveis ganhos.

A estrutura atual deve ser mantida separada das decisões futuras sobre balanceamento.

Ainda precisam ser estabelecidos ou revisados:

- A quantidade de XP necessária para cada nível.
- A curva de progressão entre níveis.
- Os atributos ou benefícios concedidos ao subir de nível.
- A relação entre nível e limite máximo dos atributos.
- A concessão de experiência por exploração, missões e outras atividades.
- A prevenção de ganhos indevidos ou repetidos.

Não se deve assumir que subir de nível aumenta automaticamente todos os atributos. Essa regra precisa ser definida explicitamente.

## 7. Sistema de classes

### 7.1. Ausência de classe inicial

O personagem começa sem classe.

A intenção é que as classes sejam desbloqueadas durante a aventura, conforme o jogador desenvolve o personagem e cumpre requisitos específicos.

Os requisitos poderão envolver, futuramente:

- Valores mínimos de atributos.
- Habilidades aprendidas.
- Missões concluídas.
- Treinamento.
- Experiência em determinada atividade.
- Interações com NPCs ou outros elementos do mundo.

Esses requisitos ainda precisam ser definidos. A documentação não estabelece classes ou condições definitivas que ainda não foram aprovadas.

### 7.2. Classes como caminhos de desenvolvimento

As classes devem representar caminhos de especialização, e não necessariamente restrições absolutas sobre tudo o que o personagem pode aprender.

A intenção é permitir combinações e desenvolvimentos menos rígidos.

Exemplos conceituais:

- Um personagem com perfil de guerreiro poderá aprender determinadas técnicas mágicas.
- Um personagem com perfil de mago poderá desenvolver técnicas físicas.
- Um personagem poderá combinar capacidades de áreas diferentes, respeitando os requisitos e limites de cada habilidade.

Isso não significa que todas as habilidades serão acessíveis a todos. Requisitos, custos, treinamento e restrições ainda poderão existir.

### 7.3. Progressão das classes

A progressão planejada poderá seguir uma estrutura semelhante a esta:

1. Personagem sem classe.
2. Desenvolvimento de atributos e habilidades.
3. Cumprimento dos requisitos de uma classe.
4. Desbloqueio e desenvolvimento da classe.
5. Acesso a especializações ou evoluções posteriores.
6. Possibilidade de alcançar classes de níveis superiores.

Essa estrutura é conceitual. Os nomes, níveis, requisitos, ramificações e condições de evolução ainda não estão definidos por completo.

A arquitetura deverá permitir adicionar classes por meio de arquivos de dados próprios, mantendo a lógica de desbloqueio e validação em módulos especializados.

### 7.4. Classes planejadas

As classes iniciais e avançadas ainda serão definidas.

A classe Assassino está fora do escopo da V1 conforme a decisão atual do projeto. Isso não impede uma eventual inclusão em versões futuras, caso seja aprovada.

## 8. Habilidades e especializações futuras

O projeto pretende permitir o desenvolvimento de habilidades relacionadas a diferentes estilos de jogo.

Futuramente, habilidades poderão possuir:

- Identificador único.
- Nome e descrição.
- Requisitos.
- Custos para utilização.
- Efeitos.
- Relação com atributos.
- Relação com classes ou treinamentos.
- Condições de desbloqueio.
- Possibilidade de evolução.

Uma habilidade poderá contribuir para o desenvolvimento de maestrias relacionadas ao seu uso, caso essa regra seja aprovada.

Os detalhes do sistema de habilidades não estão definidos por completo nesta documentação. Sua implementação deverá ser planejada como um sistema próprio, integrado ao personagem sem concentrar toda a lógica em um único arquivo.

## 9. Persistência e armazenamento

Os dados do personagem precisam permanecer disponíveis entre as telas e sessões do jogo, conforme o mecanismo de armazenamento adotado.

Na implementação atual, o módulo `aplicativos/jogo/personagem/armazenamento.js` é responsável pelas operações de armazenamento e atualização do personagem.

Entre as operações existentes estão:

- Salvar o personagem.
- Carregar o personagem.
- Remover o personagem.
- Adicionar experiência geral.
- Adicionar experiência de maestria.

O armazenamento atual utiliza `localStorage` do navegador, com a chave `rpg_web_personagem`.

Isso atende à estrutura local atual do projeto. Uma futura versão com contas, múltiplos personagens por usuário, servidores ou persistência centralizada poderá exigir outra arquitetura, mas essa mudança não deve ser antecipada sem necessidade.

A validação das informações deve continuar sendo responsabilidade da lógica do jogo, não apenas da interface.

## 10. Organização dos módulos do personagem

A estrutura atual separa responsabilidades:

### `aplicativos/jogo/personagem/personagem.js`

Responsável pela criação e pelas regras básicas de validação do personagem, incluindo os atributos disponíveis e a distribuição inicial de pontos.

### `aplicativos/jogo/personagem/armazenamento.js`

Responsável por persistir e recuperar os dados do personagem e por operações relacionadas à experiência geral e à maestria.

### `aplicativos/jogo/personagem/progressao.js`

Responsável pelas regras de progressão do personagem. Seu escopo específico deve ser conferido junto ao código atual antes de documentar detalhes adicionais.

### `aplicativos/jogo/atributos/maestria.js`

Responsável pelas operações relacionadas à estrutura de maestrias dos atributos.

### `configuracoes/progressao/personagem.js`

Centraliza configurações e regras numéricas relacionadas à progressão do personagem, incluindo o cálculo do limite de atributos.

### `configuracoes/progressao/maestria.js`

Centraliza configurações relacionadas à evolução por maestria.

Os módulos de configuração devem conter parâmetros e regras de progressão que façam sentido serem configuráveis. Os dados de conteúdo e a lógica operacional devem permanecer organizados de acordo com suas responsabilidades.

## 11. Testes e confiabilidade

As regras do personagem devem possuir testes automatizados para reduzir o risco de regressões quando novos sistemas forem adicionados.

Entre os comportamentos que devem ser verificados estão:

- Criação válida do personagem.
- Rejeição de distribuições de atributos inválidas.
- Respeito aos pontos disponíveis.
- Respeito aos limites de atributos.
- Salvamento e carregamento.
- Adição de experiência.
- Progressão de nível.
- Ganhos de experiência de maestria.
- Preservação dos dados durante atualizações.
- Tratamento de situações inválidas.

Os testes existentes devem ser atualizados quando as regras mudarem. Novos comportamentos não devem ser considerados concluídos apenas porque funcionam visualmente na interface.

## 12. Princípios de arquitetura

O sistema de personagem deve respeitar a regra fundamental do RPG Web:

> O código define como funciona; os dados definem o que existe no jogo.

Na prática:

- Cada módulo deve possuir uma responsabilidade clara.
- Conteúdo não deve ser concentrado em arquivos centrais gigantes.
- Novas classes, habilidades e outros conteúdos devem preferencialmente ser adicionados por arquivos de dados próprios.
- A lógica de validação deve ficar separada da apresentação visual.
- Sistemas independentes não devem ser misturados sem necessidade.
- Novas funcionalidades devem ser adicionadas sem alterar sistemas existentes sempre que isso for possível e seguro.
- Alterações em regras compartilhadas devem ser acompanhadas de testes.
- A arquitetura deve permitir expansão gradual, sem criar complexidade desnecessária antes de ela ser necessária.

A separação modular não significa que nenhum arquivo existente poderá ser alterado. Significa que cada alteração deve acontecer no módulo responsável pela regra afetada, evitando efeitos colaterais em sistemas não relacionados.

## 13. Estado das decisões

### Implementado ou presente na estrutura atual

- Criação do personagem com oito atributos.
- Distribuição inicial de 40 pontos.
- Limite de 12 pontos por atributo durante a criação inicial.
- Personagem inicial no nível 1, com 0 XP e sem classe.
- Estrutura de armazenamento do personagem.
- Operações para adicionar experiência geral e experiência de maestria.
- Configurações de progressão e limites de atributos.
- Módulos de lógica separados para partes do sistema.

A presença de um módulo não garante, por si só, que todas as regras futuras descritas neste documento estejam implementadas.

### Definido como direção do projeto

- Classes não obrigatórias na criação.
- Desenvolvimento gradual do personagem.
- Maestria individual para cada atributo.
- Separação entre experiência geral e experiência de maestria.
- Liberdade para combinar caminhos de desenvolvimento.
- Arquitetura modular e orientada a dados.
- Possibilidade de expandir o sistema sem concentrar todas as regras em um único arquivo.

### Em aberto para decisões futuras

- Fórmulas completas dos atributos.
- Curva de XP e progressão dos níveis.
- Regras definitivas de ganho de maestria.
- Evolução dos limites dos atributos.
- Benefícios concedidos ao subir de nível.
- Lista de classes e requisitos de desbloqueio.
- Sistema de habilidades e suas evoluções.
- Fórmulas de vida, dano, defesa e outros valores derivados.
- Relações definitivas entre atividades, habilidades e maestrias.

## 14. Critério para considerar o sistema concluído

O sistema de personagem deverá ser considerado concluído para uma versão específica quando suas regras aprovadas estiverem implementadas, validadas por testes e documentadas de forma compatível com o código.

Uma ideia descrita nesta documentação não deve ser tratada automaticamente como funcionalidade pronta.

Quando uma decisão de design for aprovada, a documentação deverá ser atualizada. Quando a implementação for concluída, o estado deverá ser atualizado novamente para refletir o comportamento real do jogo.
