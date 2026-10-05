import { RelatorioController } from "../controllers/RelatorioController";
import { perguntar } from "../utils/terminal";

export async function menuRelatorios(): Promise<void> {
    const relatorioController = new RelatorioController();

    while (true) {
        console.log("\n--- MENU DE RELATÓRIOS ---");
        console.log("1 - Livros disponíveis");
        console.log("2 - Livros emprestados");
        console.log("3 - Livros por autor");
        console.log("0 - Voltar ao menu principal");

        const opcao = await perguntar("Escolha uma opção: ");

        try {
            switch (opcao) {
                case "1":
                    await relatorioController.listarLivrosDisponiveis();
                    break;
                
                case "2":
                    await relatorioController.listarLivrosEmprestados();
                    break;

                case "3":
                    await relatorioController.listarLivrosPorAutor();
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