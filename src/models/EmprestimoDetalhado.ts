export interface EmprestimoDetalhado {
    id: number;
    livroTitulo: string;
    clienteNome: string;
    dataEmprestimo: Date;
    dataDevolucao: Date | null;
}