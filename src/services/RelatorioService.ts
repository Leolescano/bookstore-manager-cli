import { LivroDisponivel } from "../models/Relatorios";
import { RelatorioRepository } from "../repositories/RelatorioRepository";

export class RelatorioService {
    private relatorioRepository: RelatorioRepository;

    constructor() {
        this.relatorioRepository = new RelatorioRepository();
    }

    async listarLivrosDisponiveis(): Promise<LivroDisponivel[]> {
        return this.relatorioRepository.listarLivrosDisponiveis();
    }
}