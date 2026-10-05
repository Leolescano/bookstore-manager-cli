import { AutorController } from "../controllers/AutorController";
import { perguntar } from "../utils/terminal";

export async function menuAutores(): Promise<void> {
    const autorController = new AutorController();

    while (true) {
        console.log("\n--- MENU DE AUTORES ---");
        console.log("1 - Cadastrar autor");
        console.log("2 - Listar autores");
        console.log("3 - Buscar autor por ID");
        console.log("4 - Atualizar autor");
        console.log("5 - Excluir autor");
        console.log("0 - Sair");

        const opcao = await perguntar("Escolha uma opção: ");

        try {
            switch (opcao) {
                case "1":
                    await autorController.cadastrar();
                    break;
                case "2":
                    await autorController.listar();
                    break;
                case "3":
                    await autorController.buscarPorId();
                    break;
                case "4":
                    await autorController.atualizar();
                    break;
                case "5":
                    await autorController.excluir();
                    break;
                case "0":
                    console.log("Até a próxima!");
                    return;

                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        } catch (erro) {
            if (erro instanceof Error) {
                console.error("Erro:", erro.message);
            } else {
                console.error("Erro inesperado:", erro);
            }
        }
    }
}