import { pool } from "../database/connection";
import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoDetalhado } from "../models/EmprestimoDetalhado";

export class EmprestimoRepository {
    async registrar(
        livroId: number,
        clienteId: number
    ): Promise<Emprestimo> {
        const conexao = await pool.connect();

        try {
            await conexao.query("BEGIN");

            const estoque = await conexao.query(
                `UPDATE livros
                 SET quantidade_disponivel = quantidade_disponivel - 1
                 WHERE id = $1 AND quantidade_disponivel > 0
                 RETURNING id`,
                [livroId]
            );

            if (estoque.rows.length === 0) {
                throw new Error(
                    "Livro não encontrado ou sem exemplares disponíveis."
                );
            }

            const resultado = await conexao.query(
                `INSERT INTO emprestimos (livro_id, cliente_id)
                 VALUES ($1, $2)
                 RETURNING id, livro_id, cliente_id,
                           data_emprestimo, data_devolucao`,
                [livroId, clienteId]
            );

            const registro = resultado.rows[0];

            const emprestimo = new Emprestimo(
                registro.id,
                registro.livro_id,
                registro.cliente_id,
                registro.data_emprestimo,
                registro.data_devolucao
            );

            await conexao.query("COMMIT");

            return emprestimo;
        } catch (erro) {
            await conexao.query("ROLLBACK");
            throw erro;
        } finally {
            conexao.release();
        }
    }

    async buscarPorId(id: number): Promise<Emprestimo | null> {
        const resultado = await pool.query(
            `SELECT
                id,
                livro_id,
                cliente_id,
                data_emprestimo,
                data_devolucao
            FROM emprestimos
            WHERE id = $1`,
            [id]
        );

        const registro = resultado.rows[0];

        if (!registro) {
            return null;
        }

        return new Emprestimo(
            registro.id,
            registro.livro_id,
            registro.cliente_id,
            registro.data_emprestimo,
            registro.data_devolucao
        );
    }

    async devolver(id: number): Promise<Emprestimo> {
        const conexao = await pool.connect();

        try {
            await conexao.query("BEGIN");

            const resultado = await conexao.query(
                `UPDATE emprestimos
                SET data_devolucao = CURRENT_TIMESTAMP
                WHERE id = $1 AND data_devolucao IS NULL
                RETURNING id, livro_id, cliente_id,
                        data_emprestimo, data_devolucao`,
                [id]
            );

            const registro = resultado.rows[0];

            if (!registro) {
                throw new Error("Empréstimo não encontrado ou já devolvido.");
            }

            const estoque = await conexao.query(
                `UPDATE livros
                SET quantidade_disponivel = quantidade_disponivel + 1
                WHERE id = $1
                RETURNING id`,
                [registro.livro_id]
            );

            if (estoque.rows.length === 0) {
                throw new Error("Livro do empréstimo não encontrado.");
            }

            const emprestimo = new Emprestimo(
                registro.id,
                registro.livro_id,
                registro.cliente_id,
                registro.data_emprestimo,
                registro.data_devolucao
            );

            await conexao.query("COMMIT");

            return emprestimo;
        } catch (erro) {
            await conexao.query("ROLLBACK");
            throw erro;
        } finally {
            conexao.release();
        }
    }

    async listar(): Promise<EmprestimoDetalhado[]> {
        const resultado = await pool.query(
            `SELECT
                emprestimos.id,
                livros.titulo AS livro_titulo,
                clientes.nome AS cliente_nome,
                emprestimos.data_emprestimo,
                emprestimos.data_devolucao
            FROM emprestimos
            INNER JOIN livros
                ON emprestimos.livro_id = livros.id
            INNER JOIN clientes
                ON emprestimos.cliente_id = clientes.id
            ORDER BY emprestimos.id DESC`
        );

        const emprestimos: EmprestimoDetalhado[] = [];

        for (const registro of resultado.rows) {
            emprestimos.push({
                id: registro.id,
                livroTitulo: registro.livro_titulo,
                clienteNome: registro.cliente_nome,
                dataEmprestimo: registro.data_emprestimo,
                dataDevolucao: registro.data_devolucao
            });
        }

        return emprestimos;
    }
}