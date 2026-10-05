import { pool } from "../database/connection";
import { Autor } from "../models/Autor";

export class AutorRepository {
    async cadastrar(nome: string): Promise<Autor> {
        const resultado = await pool.query(
            "INSERT INTO autores (nome) VALUES ($1) RETURNING id, nome",
            [nome]
        );

        const registro = resultado.rows[0];

        return new Autor(registro.id, registro.nome);
    }

    async listar(): Promise<Autor[]> {
        const resultado = await pool.query(
            "SELECT id, nome FROM autores ORDER BY nome, id"
         );

        const autores: Autor[] = [];

        for (const registro of resultado.rows) {
            const autor = new Autor(registro.id, registro.nome);
            autores.push(autor);
         }
        return autores;
   }

   async buscarPorId(id: number): Promise<Autor | null> {
        const resultado = await pool.query(
            "SELECT id, nome FROM autores WHERE id = $1",
            [id]
        );

        const registro = resultado.rows[0];

        if (!registro) {
            return null;
        }

        return new Autor(registro.id, registro.nome);
    }

    async atualizar(id: number, nome: string): Promise<Autor | null> {
        const resultado = await pool.query(
            "UPDATE autores SET nome = $1 WHERE id = $2 RETURNING id, nome",
            [nome, id]
        );

        const registro = resultado.rows[0];

        if (!registro) {
            return null;
        }

        return new Autor(registro.id, registro.nome);
    }

    async excluir(id: number): Promise<boolean> {
        const resultado = await pool.query(
            "DELETE FROM autores WHERE id = $1 RETURNING id",
            [id]
        );

        return resultado.rows.length > 0;
    }
}