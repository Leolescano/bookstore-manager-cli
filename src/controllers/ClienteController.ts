import { ClienteService } from "../services/ClienteService";
import { perguntar } from "../utils/terminal";

export class ClienteController {
    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

    async cadastrar(): Promise<void> {
        const nome = await perguntar("Digite o nome do cliente: ");
        const email = await perguntar("Digite o e-mail do cliente: ");

        const cliente = await this.clienteService.cadastrar(nome, email);

        console.log("Cliente cadastrado com sucesso!");
        console.table([cliente]);
    }
}