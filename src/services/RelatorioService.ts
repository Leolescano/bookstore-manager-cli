import {
    LivroDisponivel,
    LivroEmprestado,
    LivrosPorAutor,
    EmprestimosPorLivro
} from "../models/Relatorios";
import { ClienteComEmprestimos } from "../models/Relatorios";
import { RelatorioRepository } from "../repositories/RelatorioRepository";

export class RelatorioService {
    private relatorioRepository: RelatorioRepository;

    constructor() {
        this.relatorioRepository = new RelatorioRepository();
    }

    async listarLivrosDisponiveis(): Promise<LivroDisponivel[]> {
        return this.relatorioRepository.listarLivrosDisponiveis();
    }

    async listarLivrosEmprestados(): Promise<LivroEmprestado[]> {
    return this.relatorioRepository.listarLivrosEmprestados();
    }

    async listarLivrosPorAutor(): Promise<LivrosPorAutor[]> {
        return this.relatorioRepository.listarLivrosPorAutor();
    }

   async listarEmprestimosPorLivro(
        limite: number | null = null
    ): Promise<EmprestimosPorLivro[]> {
        if (
            limite !== null &&
            (!Number.isInteger(limite) || limite <= 0)
        ) {
            throw new Error("O limite deve ser um número inteiro positivo.");
        }

        return this.relatorioRepository.listarEmprestimosPorLivro(limite);
    }
    
    async listarClientesComEmprestimos(): Promise<ClienteComEmprestimos[]> {
        return this.relatorioRepository.listarClientesComEmprestimos();
    }
}