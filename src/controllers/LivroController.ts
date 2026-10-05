import { LivroService } from "../services/LivroService";
import { perguntar } from "../utils/terminal";

export class LivroController {
    private livroService: LivroService;

    constructor() {
        this.livroService = new LivroService();
    }

    async cadastrar(): Promise<void> {
        const titulo = await perguntar("Digite o título do livro: ");

        const entradaAutor = await perguntar("Digite o ID do autor: ");
        const autorId = Number(entradaAutor);

        const entradaQuantidade = await perguntar(
            "Digite a quantidade total de exemplares: "
        );

        if (entradaQuantidade === "") {
            throw new Error("Informe a quantidade total de exemplares.");
        }

        const quantidadeTotal = Number(entradaQuantidade);

        const livro = await this.livroService.cadastrar(
            titulo,
            autorId,
            quantidadeTotal
        );

        console.log("Livro cadastrado com sucesso!");
        console.table([livro]);
    }
    
    async listar(): Promise<void> {
        const livros = await this.livroService.listar();

        if (livros.length === 0) {
            console.log("Nenhum livro cadastrado.");
            return;
        }

        console.log("\nLivros cadastrados:");
        console.table(livros);
    }

    async buscarPorId(): Promise<void> {
        const entrada = await perguntar("Digite o ID do livro: ");
        const id = Number(entrada);

        const livro = await this.livroService.buscarPorId(id);

        console.table([livro]);
    }

    async atualizar(): Promise<void> {
        const entradaId = await perguntar("Digite o ID do livro: ");
        const id = Number(entradaId);

        const livroAtual = await this.livroService.buscarPorId(id);

        console.log("Dados atuais:");
        console.table([livroAtual]);

        const titulo = await perguntar("Digite o novo título: ");

        const entradaAutor = await perguntar("Digite o ID do autor: ");
        const autorId = Number(entradaAutor);

        const entradaQuantidade = await perguntar(
            "Digite a nova quantidade total: "
        );

        if (entradaQuantidade === "") {
            throw new Error("Informe a quantidade total de exemplares.");
        }

        const quantidadeTotal = Number(entradaQuantidade);

        const livroAtualizado = await this.livroService.atualizar(
            id,
            titulo,
            autorId,
            quantidadeTotal
        );

        console.log("Livro atualizado com sucesso!");
        console.table([livroAtualizado]);
    }

}