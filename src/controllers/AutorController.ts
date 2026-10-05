import { AutorService } from "../services/AutorService";
import { perguntar } from "../utils/terminal";

export class AutorController {
    private autorService: AutorService;

    constructor() {
        this.autorService = new AutorService();
    }

    async cadastrar(): Promise<void> {
        const nome = await perguntar("Digite o nome do autor: ");

        const autor = await this.autorService.cadastrar(nome);

        console.log("Autor cadastrado com sucesso!");
        console.table([autor]);
    }

    async listar(): Promise<void> {
        const autores = await this.autorService.listar();

        if (autores.length === 0) {
            console.log("Nenhum autor cadastrado.");
            return;
        }

        console.log("\nAutores cadastrados:");
        console.table(autores);
    }

    async buscarPorId(): Promise<void> {
        const entrada = await perguntar("Digite o ID do autor: ");
        const id = Number(entrada);

        const autor = await this.autorService.buscarPorId(id);

        console.table([autor]);
    }

    async atualizar(): Promise<void> {
        const entrada = await perguntar("Digite o ID do autor: ");
        const id = Number(entrada);

        const autorAtual = await this.autorService.buscarPorId(id);

        console.log("Nome atual:", autorAtual.nome);

        const nome = await perguntar("Digite o novo nome: ");

        const autorAtualizado = await this.autorService.atualizar(id, nome);

        console.log("Autor atualizado com sucesso!");
        console.table([autorAtualizado]);
    }

    async excluir(): Promise<void> {
        const entrada = await perguntar("Digite o ID do autor: ");
        const id = Number(entrada);

        const autor = await this.autorService.buscarPorId(id);

        console.table([autor]);

        const confirmacao = await perguntar(
            "Deseja excluir este autor? Digite s para confirmar: "
        );

        if (confirmacao.toLowerCase() !== "s") {
            console.log("Exclusão cancelada.");
            return;
        }

        await this.autorService.excluir(id);

        console.log("Autor excluído com sucesso!");
    }
}