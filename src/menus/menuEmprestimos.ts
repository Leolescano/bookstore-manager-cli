import { EmprestimoController } from "../controllers/EmprestimoController";
import { perguntar } from "../utils/terminal";

export async function menuEmprestimos(): Promise<void> {
    const emprestimoController = new EmprestimoController();

    while (true) {
        console.log("\n--- MENU DE EMPRÉSTIMOS ---");
        console.log("1 - Registrar empréstimo");
        console.log("2 - Registrar devolução");
        console.log("0 - Voltar ao menu principal");

        const opcao = await perguntar("Escolha uma opção: ");

        try {
            switch (opcao) {
                case "1":
                    await emprestimoController.registrar();
                    break;
                
                case "2":
                    await emprestimoController.devolver();
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