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

    async listar(): Promise<void> {
        const clientes = await this.clienteService.listar();

        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado.");
            return;
        }

        console.log("\nClientes cadastrados:");
        console.table(clientes);
    }

    async buscarPorId(): Promise<void> {
        const entrada = await perguntar("Digite o ID do cliente: ");
        const id = Number(entrada);

        const cliente = await this.clienteService.buscarPorId(id);

        console.table([cliente]);
    }

    async atualizar(): Promise<void> {
        const entrada = await perguntar("Digite o ID do cliente: ");
        const id = Number(entrada);

        const clienteAtual = await this.clienteService.buscarPorId(id);

        console.log("Dados atuais:");
        console.table([clienteAtual]);

        const nome = await perguntar("Digite o novo nome: ");
        const email = await perguntar("Digite o novo e-mail: ");

        const clienteAtualizado = await this.clienteService.atualizar(
            id,
            nome,
            email
        );

        console.log("Cliente atualizado com sucesso!");
        console.table([clienteAtualizado]);
    }
   
    async excluir(): Promise<void> {
        const entrada = await perguntar("Digite o ID do cliente: ");
        const id = Number(entrada);

        const cliente = await this.clienteService.buscarPorId(id);

        console.table([cliente]);

        const confirmacao = await perguntar(
            "Deseja excluir este cliente? Digite s para confirmar: "
        );

        if (confirmacao.toLowerCase() !== "s") {
            console.log("Exclusão cancelada.");
            return;
        }

        await this.clienteService.excluir(id);

        console.log("Cliente excluído com sucesso!");
    }
}