import { pool } from "./database/connection";
import { AutorService } from "./services/AutorService";

async function testarListagemAutores(): Promise<void> {
    const autorService = new AutorService();

    try {
        const autores = await autorService.listar();

        if (autores.length === 0) {
            console.log("Nenhum autor cadastrado.");
        } else {
            console.log("Autores cadastrados:");
            console.table(autores);
        }
    } catch (erro) {
        if (erro instanceof Error) {
            console.error("Erro ao listar autores:", erro.message);
        } else {
            console.error("Erro inesperado:", erro);
        }
    } finally {
        await pool.end();
    }
}

testarListagemAutores();