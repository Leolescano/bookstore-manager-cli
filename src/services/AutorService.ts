import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";

export class AutorService {
    private autorRepository: AutorRepository;

    constructor() {
        this.autorRepository = new AutorRepository();
    }

    async cadastrar(nome: string): Promise<Autor> {
        const nomeTratado = nome.trim();

        if (nomeTratado.length === 0) {
            throw new Error("O nome do autor é obrigatório.");
        }

        if (nomeTratado.length > 150) {
            throw new Error("O nome do autor deve ter até 150 caracteres.");
        }

        return this.autorRepository.cadastrar(nomeTratado);
    }

    async listar(): Promise<Autor[]> {
        return this.autorRepository.listar();
    }
}