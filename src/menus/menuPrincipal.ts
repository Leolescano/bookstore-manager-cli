import { perguntar } from "../utils/terminal";
import { menuAutores } from "./menuAutores";
import { menuLivros } from "./menuLivros";
import { menuClientes } from "./menuClientes";
import { menuEmprestimos } from "./menuEmprestimos";
import { menuRelatorios } from "./menuRelatorios";

export async function menuPrincipal(): Promise<void> {
    while (true) {
        console.log("\n--- BOOKSTORE MANAGER ---");
        console.log("1 - Gerenciar autores");
        console.log("2 - Gerenciar livros");
        console.log("3 - Gerenciar clientes");
        console.log("4 - Gerenciar empréstimos");
        console.log("5 - Relatórios");
        console.log("0 - Sair");

        const opcao = await perguntar("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await menuAutores();
                break;

            case "2":
                await menuLivros();
                break;

            case "3":
                await menuClientes();
                break;    
            
            case "4":
                await menuEmprestimos();
                break;

            case "5":
                await menuRelatorios();
                break;
                
            case "0":
                console.log("Até a próxima!");
                return;

            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}