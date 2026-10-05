import { RelatorioService } from "../services/RelatorioService";

export class RelatorioController {
    private relatorioService: RelatorioService;

    constructor() {
        this.relatorioService = new RelatorioService();
    }

    async listarLivrosDisponiveis(): Promise<void> {
        const livros = await this.relatorioService.listarLivrosDisponiveis();

        if (livros.length === 0) {
            console.log("Nenhum livro disponível para empréstimo.");
            return;
        }

        console.log("\n--- LIVROS DISPONÍVEIS ---");
        console.table(livros);
    }
}