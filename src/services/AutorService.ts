import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";

export class AutorService {
    private autorRepository: AutorRepository;

    constructor() {
        this.autorRepository = new AutorRepository();
    }

    async cadastrar(nome: string): Promise<Autor> {
        const nomeTratado = this.validarNome(nome);

        return this.autorRepository.cadastrar(nomeTratado);
    }
    
    async listar(): Promise<Autor[]> {
        return this.autorRepository.listar();
    }

    async buscarPorId(id: number): Promise<Autor> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("O ID do autor deve ser um número inteiro positivo.");
        }

        const autor = await this.autorRepository.buscarPorId(id);

        if (autor === null) {
            throw new Error("Autor não encontrado.");
        }

        return autor;
    }

    async atualizar(id: number, nome: string): Promise<Autor> {
        await this.buscarPorId(id);

        const nomeTratado = this.validarNome(nome);

        const autor = await this.autorRepository.atualizar(id, nomeTratado);

        if (autor === null) {
            throw new Error("Autor não encontrado.");
        }

        return autor;
    }

    async excluir(id: number): Promise<void> {
        await this.buscarPorId(id);

        try {
            const excluido = await this.autorRepository.excluir(id);

            if (!excluido) {
                throw new Error("Autor não encontrado.");
            }
        } catch (erro) {
            if (
                erro instanceof Error &&
                "code" in erro &&
                erro.code === "23503"
            ) {
                throw new Error(
                    "Não é possível excluir um autor que possui livros cadastrados."
                );
            }

            throw erro;
        }
    }

    private validarNome(nome: string): string {
        const nomeTratado = nome.trim();

        if (nomeTratado.length === 0) {
            throw new Error("O nome do autor é obrigatório.");
        }

        if (nomeTratado.length > 150) {
            throw new Error("O nome do autor deve ter até 150 caracteres.");
        }

        return nomeTratado;
    }
}