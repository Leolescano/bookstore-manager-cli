import { perguntar } from "../utils/terminal";
import { menuAutores } from "./menuAutores";
import { menuLivros } from "./menuLivros";

export async function menuPrincipal(): Promise<void> {
    while (true) {
        console.log("\n--- BOOKSTORE MANAGER ---");
        console.log("1 - Gerenciar autores");
        console.log("2 - Gerenciar livros");
        console.log("0 - Sair");

        const opcao = await perguntar("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await menuAutores();
                break;

            case "2":
                await menuLivros();
                break;

            case "0":
                console.log("Até a próxima!");
                return;

            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}