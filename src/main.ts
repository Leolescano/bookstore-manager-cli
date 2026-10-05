import { pool } from "./database/connection";
import { AutorService } from "./services/AutorService";

async function testarCadastroAutor(): Promise<void> {
    const autorService = new AutorService();

    try {
        const autor = await autorService.cadastrar("   ");

        console.log("Autor cadastrado:", autor);
    } catch (erro) {
        if (erro instanceof Error) {
            console.error("Erro ao cadastrar autor:", erro.message);
        } else {
            console.error("Erro inesperado:", erro);
        }
    } finally {
        await pool.end();
    }
}

testarCadastroAutor();