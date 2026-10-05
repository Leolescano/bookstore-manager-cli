import { pool } from "./database/connection";
import { AutorService } from "./services/AutorService";

async function testarAtualizacaoAutor(): Promise<void> {
    const autorService = new AutorService();

    try {
        const autor = await autorService.atualizar(
            1,
            "  "
        );

        console.log("Autor atualizado:", autor);
    } catch (erro) {
        if (erro instanceof Error) {
            console.error("Erro ao atualizar autor:", erro.message);
        } else {
            console.error("Erro inesperado:", erro);
        }
    } finally {
        await pool.end();
    }
}

testarAtualizacaoAutor();