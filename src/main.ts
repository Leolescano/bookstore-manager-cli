import { pool } from "./database/connection";
import { AutorService } from "./services/AutorService";

async function testarAutorComLivro(): Promise<void> {
    const autorService = new AutorService();

    try {
        await autorService.excluir(1);

        console.log("Autor excluído.");
    } catch (erro) {
        if (erro instanceof Error) {
            console.error("Erro ao excluir autor:", erro.message);
        } else {
            console.error("Erro inesperado:", erro);
        }
    } finally {
        await pool.end();
    }
}

testarAutorComLivro();