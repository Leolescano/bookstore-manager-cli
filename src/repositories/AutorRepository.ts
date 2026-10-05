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
}