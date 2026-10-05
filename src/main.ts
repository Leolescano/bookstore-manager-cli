import { pool } from "./database/connection";

const nomeDoSistema: string = "BookStore Manager CLI";

async function testarConexao(): Promise<void> {
    console.log(`Bem-vindo ao ${nomeDoSistema}!`);

    try {
        const resultado = await pool.query(
            "SELECT current_database() AS banco"
        );

        console.log("Conectado ao banco:", resultado.rows[0].banco);
    } catch (erro) {
        console.error("Não foi possível conectar ao banco:", erro);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

testarConexao();