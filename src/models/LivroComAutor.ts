export interface LivroComAutor {
    id: number;
    titulo: string;
    autorId: number;
    autorNome: string;
    quantidadeTotal: number;
    quantidadeDisponivel: number;
}