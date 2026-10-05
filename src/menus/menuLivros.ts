import { LivroController } from "../controllers/LivroController";
import { perguntar } from "../utils/terminal";

export async function menuLivros(): Promise<void> {
    const livroController = new LivroController();

    while (true) {
        console.log("\n--- MENU DE LIVROS ---");
        console.log("1 - Cadastrar livro");
        console.log("2 - Listar livros");
        console.log("3 - Buscar livro por ID");
        console.log("4 - Atualizar livro");
        console.log("0 - Voltar ao menu principal");

        const opcao = await perguntar("Escolha uma opção: ");

        try {
            switch (opcao) {
                case "1":
                    await livroController.cadastrar();
                    break;

                case "2":
                    await livroController.listar();
                    break;

                case "3":
                    await livroController.buscarPorId();
                    break;
                
                case "4":
                    await livroController.atualizar();
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