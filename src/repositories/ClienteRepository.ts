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

    async listar(): Promise<Cliente[]> {
        const resultado = await pool.query(
            "SELECT id, nome, email FROM clientes ORDER BY nome, id"
        );

        const clientes: Cliente[] = [];

        for (const registro of resultado.rows) {
            const cliente = new Cliente(
                registro.id,
                registro.nome,
                registro.email
            );

            clientes.push(cliente);
        }

        return clientes;
    }

    async buscarPorId(id: number): Promise<Cliente | null> {
        const resultado = await pool.query(
            "SELECT id, nome, email FROM clientes WHERE id = $1",
            [id]
        );

        const registro = resultado.rows[0];

        if (!registro) {
            return null;
        }

        return new Cliente(
            registro.id,
            registro.nome,
            registro.email
        );
    }

    async atualizar(
        id: number,
        nome: string,
        email: string
    ): Promise<Cliente | null> {
        const resultado = await pool.query(
            `UPDATE clientes
            SET nome = $1, email = $2
            WHERE id = $3
            RETURNING id, nome, email`,
            [nome, email, id]
        );

        const registro = resultado.rows[0];

        if (!registro) {
            return null;
        }

        return new Cliente(
            registro.id,
            registro.nome,
            registro.email
        );
    }
}