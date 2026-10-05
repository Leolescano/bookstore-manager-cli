import { pool } from "./database/connection";
import { AutorService } from "./services/AutorService";

async function testarBuscaAutor(): Promise<void> {
    const autorService = new AutorService();

    try {
        const autor = await autorService.buscarPorId(0);

        console.log("Autor encontrado:", autor);
    } catch (erro) {
        if (erro instanceof Error) {
            console.error("Erro ao buscar autor:", erro.message);
        } else {
            console.error("Erro inesperado:", erro);
        }
    } finally {
        await pool.end();
    }
}

testarBuscaAutor();