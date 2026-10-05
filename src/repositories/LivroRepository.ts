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
}