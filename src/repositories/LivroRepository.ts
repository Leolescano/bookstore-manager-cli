import { LivroComAutor } from "../models/LivroComAutor";
import { pool } from "../database/connection";
import { Livro } from "../models/Livro";

export class LivroRepository {
    async cadastrar(
        titulo: string,
        autorId: number,
        quantidadeTotal: number
    ): Promise<Livro> {
        const resultado = await pool.query(
            `INSERT INTO livros (
                titulo,
                autor_id,
                quantidade_total,
                quantidade_disponivel
            )
            VALUES ($1, $2, $3, $3)
            RETURNING id, titulo, autor_id,
                      quantidade_total, quantidade_disponivel`,
            [titulo, autorId, quantidadeTotal]
        );

        const registro = resultado.rows[0];

        return new Livro(
            registro.id,
            registro.titulo,
            registro.autor_id,
            registro.quantidade_total,
            registro.quantidade_disponivel
        );
    }
    async listar(): Promise<LivroComAutor[]> {
        const resultado = await pool.query(
            `SELECT
                livros.id,
                livros.titulo,
                livros.autor_id,
                autores.nome AS autor_nome,
                livros.quantidade_total,
                livros.quantidade_disponivel
            FROM livros
            INNER JOIN autores ON livros.autor_id = autores.id
            ORDER BY livros.titulo, livros.id`
        );

        const livros: LivroComAutor[] = [];

        for (const registro of resultado.rows) {
            livros.push({
                id: registro.id,
                titulo: registro.titulo,
                autorId: registro.autor_id,
                autorNome: registro.autor_nome,
                quantidadeTotal: registro.quantidade_total,
                quantidadeDisponivel: registro.quantidade_disponivel
            });
        }

        return livros;
    }

    async buscarPorId(id: number): Promise<Livro | null> {
        const resultado = await pool.query(
            `SELECT
                id,
                titulo,
                autor_id,
                quantidade_total,
                quantidade_disponivel
            FROM livros
            WHERE id = $1`,
            [id]
        );

        const registro = resultado.rows[0];

        if (!registro) {
            return null;
        }

        return new Livro(
            registro.id,
            registro.titulo,
            registro.autor_id,
            registro.quantidade_total,
            registro.quantidade_disponivel
        );
    }

    async atualizar(
        id: number,
        titulo: string,
        autorId: number,
        quantidadeTotal: number
    ): Promise<Livro | null> {
        const resultado = await pool.query(
            `UPDATE livros
            SET
                titulo = $1,
                autor_id = $2,
                quantidade_disponivel =
                    $3 - (quantidade_total - quantidade_disponivel),
                quantidade_total = $3
            WHERE id = $4
            AND $3 >= (quantidade_total - quantidade_disponivel)
            RETURNING id, titulo, autor_id,
                    quantidade_total, quantidade_disponivel`,
            [titulo, autorId, quantidadeTotal, id]
        );

        const registro = resultado.rows[0];

        if (!registro) {
            return null;
        }

        return new Livro(
            registro.id,
            registro.titulo,
            registro.autor_id,
            registro.quantidade_total,
            registro.quantidade_disponivel
        );
    }

    async excluir(id: number): Promise<boolean> {
        const resultado = await pool.query(
            "DELETE FROM livros WHERE id = $1 RETURNING id",
            [id]
        );

        return resultado.rows.length > 0;
    }

}