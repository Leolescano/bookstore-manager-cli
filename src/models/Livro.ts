export class Livro {
    public id: number;
    public titulo: string;
    public autorId: number;
    public quantidadeTotal: number;
    public quantidadeDisponivel: number;

    constructor(
        id: number,
        titulo: string,
        autorId: number,
        quantidadeTotal: number,
        quantidadeDisponivel: number
    ) {
        this.id = id;
        this.titulo = titulo;
        this.autorId = autorId;
        this.quantidadeTotal = quantidadeTotal;
        this.quantidadeDisponivel = quantidadeDisponivel;
    }
}