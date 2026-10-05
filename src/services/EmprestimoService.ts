import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { LivroService } from "./LivroService";
import { ClienteService } from "./ClienteService";

export class EmprestimoService {
    private emprestimoRepository: EmprestimoRepository;
    private livroService: LivroService;
    private clienteService: ClienteService;

    constructor() {
        this.emprestimoRepository = new EmprestimoRepository();
        this.livroService = new LivroService();
        this.clienteService = new ClienteService();
    }

    async registrar(
        livroId: number,
        clienteId: number
    ): Promise<Emprestimo> {
        const livro = await this.livroService.buscarPorId(livroId);

        await this.clienteService.buscarPorId(clienteId);

        if (livro.quantidadeDisponivel === 0) {
            throw new Error(
                "Este livro não possui exemplares disponíveis para empréstimo."
            );
        }

        return this.emprestimoRepository.registrar(livroId, clienteId);
    }

    async buscarPorId(id: number): Promise<Emprestimo> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error(
                "O ID do empréstimo deve ser um número inteiro positivo."
            );
        }

        const emprestimo = await this.emprestimoRepository.buscarPorId(id);

        if (emprestimo === null) {
            throw new Error("Empréstimo não encontrado.");
        }

        return emprestimo;
    }

    async devolver(id: number): Promise<Emprestimo> {
        const emprestimo = await this.buscarPorId(id);

        if (emprestimo.dataDevolucao !== null) {
            throw new Error("Este empréstimo já foi devolvido.");
        }

        return this.emprestimoRepository.devolver(id);
    }   
}