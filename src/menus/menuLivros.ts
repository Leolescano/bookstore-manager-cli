import { LivroController } from "../controllers/LivroController";
import { perguntar } from "../utils/terminal";

export async function menuLivros(): Promise<void> {
    const livroController = new LivroController();

    while (true) {
        console.log("\n--- MENU DE LIVROS ---");
        console.log("1 - Cadastrar livro");
        console.log("2 - Listar livros");
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