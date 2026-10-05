export interface LivroDisponivel {
    id: number;
    titulo: string;
    autorNome: string;
    quantidadeDisponivel: number;
}

export interface LivroEmprestado {
    id: number;
    titulo: string;
    quantidadeEmprestada: number;
}