
//import { menuAutores } from "./menus/menuAutores";
import { LivroController } from "./controllers/LivroController";
import { pool } from "./database/connection";
import { fecharTerminal } from "./utils/terminal";

async function iniciar(): Promise<void> {

    try {
        console.log("Bem-vindo ao BookStore Manager CLI!");

        const livroController = new LivroController();
        await livroController.cadastrar();
    } catch (erro) {
        if (erro instanceof Error) {
            console.error("Erro:", erro.message);
        } else {
            console.error("Erro inesperado:", erro);
        }
    } finally {
        fecharTerminal();
        await pool.end();
    }
}

iniciar();