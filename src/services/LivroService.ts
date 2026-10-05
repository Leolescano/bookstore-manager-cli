import { LivroComAutor } from "../models/LivroComAutor";
import { Livro } from "../models/Livro";
import { LivroRepository } from "../repositories/LivroRepository";
import { AutorService } from "./AutorService";

export class LivroService {
    private livroRepository: LivroRepository;
    private autorService: AutorService;

    constructor() {
        this.livroRepository = new LivroRepository();
        this.autorService = new AutorService();
    }

    async cadastrar(
        titulo: string,
        autorId: number,
        quantidadeTotal: number
    ): Promise<Livro> {
        const tituloTratado = titulo.trim();

        if (tituloTratado.length === 0) {
            throw new Error("O título do livro é obrigatório.");
        }

        if (tituloTratado.length > 200) {
            throw new Error("O título do livro deve ter até 200 caracteres.");
        }

        if (!Number.isInteger(quantidadeTotal) || quantidadeTotal < 0) {
            throw new Error(
                "A quantidade total deve ser um número inteiro maior ou igual a zero."
            );
        }

        await this.autorService.buscarPorId(autorId);

        return this.livroRepository.cadastrar(
            tituloTratado,
            autorId,
            quantidadeTotal
        );
    }

    async listar(): Promise<LivroComAutor[]> {
        return this.livroRepository.listar();
    }

    async buscarPorId(id: number): Promise<Livro> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("O ID do livro deve ser um número inteiro positivo.");
        }

        const livro = await this.livroRepository.buscarPorId(id);

        if (livro === null) {
            throw new Error("Livro não encontrado.");
        }

        return livro;
    }
}