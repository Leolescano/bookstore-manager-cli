import { EmprestimoService } from "../services/EmprestimoService";
import { perguntar } from "../utils/terminal";

export class EmprestimoController {
    private emprestimoService: EmprestimoService;

    constructor() {
        this.emprestimoService = new EmprestimoService();
    }

    async registrar(): Promise<void> {
        const entradaLivro = await perguntar("Digite o ID do livro: ");
        const livroId = Number(entradaLivro);

        const entradaCliente = await perguntar("Digite o ID do cliente: ");
        const clienteId = Number(entradaCliente);

        const emprestimo = await this.emprestimoService.registrar(
            livroId,
            clienteId
        );

        console.log("Empréstimo registrado com sucesso!");
        console.table([emprestimo]);
    }
}