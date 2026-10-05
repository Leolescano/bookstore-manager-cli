import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {
    private clienteRepository: ClienteRepository;

    constructor() {
        this.clienteRepository = new ClienteRepository();
    }

    async cadastrar(nome: string, email: string): Promise<Cliente> {
        const nomeTratado = nome.trim();
        const emailTratado = email.trim().toLowerCase();

        if (nomeTratado.length === 0) {
            throw new Error("O nome do cliente é obrigatório.");
        }

        if (nomeTratado.length > 150) {
            throw new Error("O nome do cliente deve ter até 150 caracteres.");
        }

        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            emailTratado.length > 254 ||
            !formatoEmail.test(emailTratado)
        ) {
            throw new Error("Informe um e-mail válido com até 254 caracteres.");
        }

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
}