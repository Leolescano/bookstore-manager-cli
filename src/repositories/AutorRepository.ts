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
}