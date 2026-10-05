import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {
    private clienteRepository: ClienteRepository;

    constructor() {
        this.clienteRepository = new ClienteRepository();
    }

    async cadastrar(nome: string, email: string): Promise<Cliente> {
        const nomeTratado = this.validarNome(nome);
        const emailTratado = this.validarEmail(email);

        try {
            return await this.clienteRepository.cadastrar(
                nomeTratado,
                emailTratado
            );
        } catch (erro) {
            if (
                erro instanceof Error &&
                "code" in erro &&
                erro.code === "23505"
            ) {
                throw new Error("Já existe um cliente com esse e-mail.");
            }

            throw erro;
        }
    }
 
    async listar(): Promise<Cliente[]> {
        return this.clienteRepository.listar();
    }

    async buscarPorId(id: number): Promise<Cliente> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("O ID do cliente deve ser um número inteiro positivo.");
        }

        const cliente = await this.clienteRepository.buscarPorId(id);

        if (cliente === null) {
            throw new Error("Cliente não encontrado.");
        }

        return cliente;
    }

    async atualizar(
        id: number,
        nome: string,
        email: string
    ): Promise<Cliente> {
        await this.buscarPorId(id);

        const nomeTratado = this.validarNome(nome);
        const emailTratado = this.validarEmail(email);

        try {
            const clienteAtualizado = await this.clienteRepository.atualizar(
                id,
                nomeTratado,
                emailTratado
            );

            if (clienteAtualizado === null) {
                throw new Error("Cliente não encontrado.");
            }

            return clienteAtualizado;
        } catch (erro) {
            if (
                erro instanceof Error &&
                "code" in erro &&
                erro.code === "23505"
            ) {
                throw new Error("Já existe um cliente com esse e-mail.");
            }

            throw erro;
        }
    }

    private validarNome(nome: string): string {
        const nomeTratado = nome.trim();

        if (nomeTratado.length === 0) {
            throw new Error("O nome do cliente é obrigatório.");
        }

        if (nomeTratado.length > 150) {
            throw new Error("O nome do cliente deve ter até 150 caracteres.");
        }

        return nomeTratado;
    }

    private validarEmail(email: string): string {
        const emailTratado = email.trim().toLowerCase();
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            emailTratado.length > 254 ||
            !formatoEmail.test(emailTratado)
        ) {
            throw new Error("Informe um e-mail válido com até 254 caracteres.");
        }

        return emailTratado;
    }
}