import { pool } from "../database/connection";
import { Cliente } from "../models/Cliente";

export class ClienteRepository {
    async cadastrar(nome: string, email: string): Promise<Cliente> {
        const resultado = await pool.query(
            `INSERT INTO clientes (nome, email)
             VALUES ($1, $2)
             RETURNING id, nome, email`,
            [nome, email]
        );

        const registro = resultado.rows[0];

        return new Cliente(
            registro.id,
            registro.nome,
            registro.email
        );
    }
}