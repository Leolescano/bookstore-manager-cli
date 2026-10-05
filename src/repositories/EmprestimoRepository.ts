import { pool } from "../database/connection";
import { Emprestimo } from "../models/Emprestimo";

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
}