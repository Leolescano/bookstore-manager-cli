import {
    LivroDisponivel,
    LivroEmprestado,
    LivrosPorAutor
} from "../models/Relatorios";
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
}