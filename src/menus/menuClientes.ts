import { ClienteController } from "../controllers/ClienteController";
import { perguntar } from "../utils/terminal";

export async function menuClientes(): Promise<void> {
    const clienteController = new ClienteController();

    while (true) {
        console.log("\n--- MENU DE CLIENTES ---");
        console.log("1 - Cadastrar cliente");
        console.log("2 - Listar clientes");
        console.log("3 - Buscar cliente por ID");
        console.log("4 - Atualizar cliente");
        console.log("0 - Voltar ao menu principal");

        const opcao = await perguntar("Escolha uma opção: ");

        try {
            switch (opcao) {
                case "1":
                    await clienteController.cadastrar();
                    break;

                case "2":
                    await clienteController.listar();
                    break;
                
                case "3":
                    await clienteController.buscarPorId();
                    break;


                case "4":
                    await clienteController.atualizar();
                    break;

                case "0":
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