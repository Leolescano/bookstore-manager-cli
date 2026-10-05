-- Guarda os autores dos livros da livraria.
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL
);

-- Guarda os livros e controla seus exemplares.
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor_id INTEGER NOT NULL REFERENCES autores(id),
    quantidade_total INTEGER NOT NULL CHECK (quantidade_total >= 0),
    quantidade_disponivel INTEGER NOT NULL,
    CHECK (
        quantidade_disponivel >= 0
        AND quantidade_disponivel <= quantidade_total
    )
);

-- Guarda os clientes da livraria.
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE
);

-- Registra os empréstimos e suas devoluções.
CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INTEGER NOT NULL REFERENCES livros(id),
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    data_emprestimo TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_devolucao TIMESTAMPTZ,
    CHECK (data_devolucao >= data_emprestimo)
);