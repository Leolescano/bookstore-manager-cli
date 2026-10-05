import { pool } from "../database/connection";
import { LivroDisponivel, LivroEmprestado } from "../models/Relatorios";

export class RelatorioRepository {
    async listarLivrosDisponiveis(): Promise<LivroDisponivel[]> {
        const resultado = await pool.query(
            `SELECT
                livros.id,
                livros.titulo,
                autores.nome AS autor_nome,
                livros.quantidade_disponivel
            FROM livros
            INNER JOIN autores
                ON livros.autor_id = autores.id
            WHERE livros.quantidade_disponivel > 0
            ORDER BY livros.titulo, livros.id`
        );

        const livros: LivroDisponivel[] = [];

        for (const registro of resultado.rows) {
            livros.push({
                id: registro.id,
                titulo: registro.titulo,
                autorNome: registro.autor_nome,
                quantidadeDisponivel: registro.quantidade_disponivel
            });
        }

        return livros;
    }

    async listarLivrosEmprestados(): Promise<LivroEmprestado[]> {
        const resultado = await pool.query(
            `SELECT
                livros.id,
                livros.titulo,
                COUNT(emprestimos.id) AS quantidade_emprestada
            FROM livros
            INNER JOIN emprestimos
                ON emprestimos.livro_id = livros.id
            WHERE emprestimos.data_devolucao IS NULL
            GROUP BY livros.id, livros.titulo
            ORDER BY quantidade_emprestada DESC, livros.titulo, livros.id`
        );

        const livros: LivroEmprestado[] = [];

        for (const registro of resultado.rows) {
            livros.push({
                id: registro.id,
                titulo: registro.titulo,
                quantidadeEmprestada: Number(registro.quantidade_emprestada)
            });
        }

        return livros;
    }
}