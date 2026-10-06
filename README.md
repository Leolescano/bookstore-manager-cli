# BookStore Manager CLI

Projeto de estudo de Back-End desenvolvido com Node.js, TypeScript e PostgreSQL. O sistema funciona pelo terminal e permite gerenciar autores, livros, clientes, empréstimos e devoluções.

Construí o projeto por etapas para praticar orientação a objetos, organização em camadas, SQL e operações assíncronas. Uma parte importante do aprendizado foi manter o estoque correto quando um livro é emprestado ou devolvido.

## Tecnologias

- Node.js 24 e npm;
- TypeScript;
- PostgreSQL 18;
- `pg` para conexão e consultas SQL;
- `dotenv` para carregar as configurações do banco;
- `tsx` para executar TypeScript durante o desenvolvimento;
- `readline/promises`, do próprio Node.js, para interação pelo terminal.

As versões das dependências estão registradas em `package.json` e `package-lock.json`. O acesso ao banco usa SQL diretamente, sem ORM.

## Funcionalidades

- Autores: cadastrar, listar, buscar por ID, atualizar e excluir.
- Livros: cadastrar, listar com o nome do autor, buscar por ID, atualizar e excluir.
- Clientes: cadastrar, listar, buscar por ID, atualizar e excluir.
- Empréstimos: registrar um exemplar por operação, validar livro e cliente e reduzir a quantidade disponível.
- Devoluções: registrar a data, restaurar um exemplar disponível e impedir devolução duplicada.
- Histórico: consultar os empréstimos com livro, cliente e datas.
- Relatórios: livros disponíveis, livros emprestados, livros por autor, total histórico de empréstimos por livro e clientes com empréstimos em aberto.
- Limite opcional de resultados no relatório do total de empréstimos por livro.

## Como executar

### 1. Preparar o ambiente

Instale Node.js, Git e PostgreSQL. O projeto foi desenvolvido com Node.js 24 e PostgreSQL 18. O pgAdmin pode ser usado para criar o banco e executar os scripts SQL.

No terminal Bash, clone o repositório e instale as dependências:

```bash
git clone https://github.com/Leolescano/bookstore-manager-cli.git
cd bookstore-manager-cli
npm ci
```

### 2. Criar o banco e as tabelas

Com o PostgreSQL em execução:

1. No pgAdmin, abra o Query Tool do banco `postgres`.
2. Abra e execute o arquivo `src/database/create-database.sql`, que cria o banco `bookstore`.
3. Atualize a lista de bancos e abra um novo Query Tool conectado ao banco `bookstore`.
4. Abra e execute o arquivo `src/database/schema.sql`, que cria as tabelas e os vínculos entre elas.

Os scripts são destinados à configuração inicial. Se o banco e as tabelas já existem, não execute novamente os comandos de criação. Um banco recém-criado começa sem registros; os exemplos usados durante o desenvolvimento não são enviados junto com o código.

### 3. Configurar a conexão

Na pasta principal do projeto, copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o `.env` com os dados do seu PostgreSQL:

```dotenv
PGHOST=localhost
PGPORT=5432
PGDATABASE=bookstore
PGUSER=postgres
PGPASSWORD="sua_senha_aqui"
```

Substitua o usuário, a senha, a porta e o endereço caso seu ambiente use valores diferentes. O arquivo `.env` é ignorado pelo Git; apenas o modelo `.env.example` acompanha o repositório.

### 4. Iniciar o programa

Para executar durante o desenvolvimento:

```bash
npm run dev
```

Para compilar e executar o JavaScript gerado:

```bash
npm run build
npm start
```

Execute esses comandos na pasta principal do projeto. Após alterar arquivos TypeScript, compile novamente antes de usar `npm start`.

## Exemplo de uso

O menu principal apresenta:

```text
1 - Gerenciar autores
2 - Gerenciar livros
3 - Gerenciar clientes
4 - Gerenciar empréstimos
5 - Relatórios
0 - Sair
```

Para experimentar o fluxo em um banco vazio:

1. Cadastre um autor, por exemplo, Machado de Assis. Anote o ID exibido.
2. Cadastre Dom Casmurro, vinculando-o ao ID desse autor e informando um exemplar.
3. Cadastre um cliente de teste, por exemplo, Ana de Teste com `ana@example.com`.
4. Registre um empréstimo usando os IDs do livro e do cliente. Anote o ID do empréstimo.
5. Consulte os livros: o total permanece em um, e a quantidade disponível passa para zero.
6. Registre a devolução usando o ID do empréstimo. A quantidade disponível volta para um.
7. Consulte o histórico para visualizar as datas e os dados relacionados.

Use sempre os IDs apresentados pelo programa. O ID do empréstimo identifica uma operação e não deve ser confundido com o ID do livro.

## Regras e validações

- Os IDs devem ser números inteiros positivos.
- Nomes e títulos obrigatórios não podem ficar vazios após a remoção de espaços das extremidades.
- O e-mail passa por uma verificação básica de formato e é salvo em letras minúsculas. Essa verificação não confirma a existência da caixa de e-mail.
- Dois clientes não podem usar o mesmo e-mail.
- Cada livro deve ter um autor existente.
- A quantidade total deve ser um número inteiro maior ou igual a zero.
- No cadastro de um livro, todos os exemplares começam disponíveis.
- Cada empréstimo retira um exemplar disponível. Livro e cliente devem existir.
- Ao atualizar o total, o programa preserva os exemplares emprestados: `disponíveis = novo total - emprestados`.
- Uma devolução só pode ocorrer uma vez por empréstimo.
- Autores com livros vinculados não podem ser excluídos.
- Livros e clientes com histórico de empréstimos não podem ser excluídos, inclusive após a devolução.
- Os menus de operação apresentam os erros e permitem novas tentativas.

Empréstimos e devoluções usam transações na mesma conexão: `COMMIT` confirma as alterações e `ROLLBACK` as desfaz em caso de erro. A conexão é liberada ao final de cada transação.

## Relatórios e SQL

| Relatório | O que apresenta |
| --- | --- |
| Livros disponíveis | Livros com pelo menos um exemplar disponível e o nome do autor. |
| Livros emprestados | Quantidade de exemplares de cada livro com empréstimo em aberto. |
| Livros por autor | Quantidade de registros de livros por autor, incluindo autores com zero livros. |
| Total de empréstimos por livro | Todo o histórico, incluindo empréstimos devolvidos e livros nunca emprestados. Enter exibe todos; um número positivo limita a quantidade de livros exibidos. |
| Clientes com empréstimos em aberto | Clientes com empréstimos ativos e a quantidade de empréstimos de cada um. |

As consultas usam `INSERT`, `SELECT`, `UPDATE`, `DELETE`, `INNER JOIN`, `LEFT JOIN`, `GROUP BY`, `ORDER BY`, `LIMIT` e a agregação `COUNT`.

## Organização do código

```text
src/
├── controllers/   # Entrada de dados e apresentação dos resultados
├── services/      # Regras de negócio e validações
├── repositories/  # Consultas SQL e transações
├── models/        # Classes e interfaces
├── database/      # Conexão e scripts de criação do banco
├── utils/         # Funções de interação com o terminal
├── menus/         # Navegação entre as funcionalidades
└── main.ts        # Início do programa e encerramento dos recursos
```

O fluxo principal é: **menu → controller → service → repository → PostgreSQL**.

O banco possui as tabelas `autores`, `livros`, `clientes` e `emprestimos`. Um autor pode ter vários livros; cada empréstimo relaciona um livro a um cliente. A ausência de data de devolução indica um empréstimo em aberto.

## Verificação

O comando `npm run build` verifica a compilação do TypeScript. O projeto também foi testado manualmente pelo terminal durante o desenvolvimento, incluindo:

- cadastros válidos e rejeição de nomes e títulos vazios;
- buscas com ID existente, inexistente e inválido;
- rejeição de e-mail duplicado, inclusive com diferença de maiúsculas;
- atualização e exclusão com confirmação;
- bloqueio de exclusões com vínculos;
- empréstimo sem estoque, livro inexistente e cliente inexistente;
- devolução, restauração do estoque e rejeição de devolução duplicada;
- proteção contra redução do total abaixo da quantidade emprestada;
- relatórios e navegação após erros de operação;
- limite de resultados válido, vazio e inválido.

## Organização do trabalho

O desenvolvimento foi dividido em commits e branches para banco de dados, autores, livros, clientes, empréstimos, relatórios e documentação. A branch `develop` reúne as funcionalidades antes da integração à `main`.

**https://github.com/users/Leolescano/projects/2/views/1**

## Autor

Leonardo Lescano — [Leolescano no GitHub](https://github.com/Leolescano).

Este projeto foi uma oportunidade de praticar como as partes de uma aplicação se conectam e de entender melhor as regras do banco de dados. Ainda estou aprendendo, e a construção por etapas ajudou a testar e compreender cada funcionalidade.
