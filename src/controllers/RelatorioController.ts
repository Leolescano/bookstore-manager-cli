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

    async listarLivrosEmprestados(): Promise<void> {
        const livros = await this.relatorioService.listarLivrosEmprestados();

        if (livros.length === 0) {
            console.log("Nenhum livro com empréstimo em aberto.");
            return;
        }

        console.log("\n--- LIVROS EMPRESTADOS ---");
        console.table(livros);
    }

    async listarLivrosPorAutor(): Promise<void> {
        const autores = await this.relatorioService.listarLivrosPorAutor();

        if (autores.length === 0) {
            console.log("Nenhum autor cadastrado.");
            return;
        }

        console.log("\n--- LIVROS POR AUTOR ---");
        console.table(autores);
    }

    async listarEmprestimosPorLivro(): Promise<void> {
        const livros = await this.relatorioService.listarEmprestimosPorLivro();

        if (livros.length === 0) {
            console.log("Nenhum livro cadastrado.");
            return;
        }

        console.log("\n--- HISTÓRICO DE EMPRÉSTIMOS POR LIVRO ---");
        console.table(livros);
    }
}