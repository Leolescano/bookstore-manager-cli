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

    async listarEmprestimosPorLivro(): Promise<EmprestimosPorLivro[]> {
        return this.relatorioRepository.listarEmprestimosPorLivro();
    }
    
    async listarClientesComEmprestimos(): Promise<ClienteComEmprestimos[]> {
        return this.relatorioRepository.listarClientesComEmprestimos();
    }
}