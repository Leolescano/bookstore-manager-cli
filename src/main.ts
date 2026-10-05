
import { menuAutores } from "./menus/menuAutores";
import { pool } from "./database/connection";
import { fecharTerminal } from "./utils/terminal";

async function iniciar(): Promise<void> {

    try {
        console.log("Bem-vindo ao BookStore Manager CLI!");

        await menuAutores();
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