import { pool } from "../database/connection";
import {
    LivroDisponivel,
    LivroEmprestado,
    LivrosPorAutor,
    EmprestimosPorLivro
} from "../models/Relatorios";

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

    async listarLivrosPorAutor(): Promise<LivrosPorAutor[]> {
        const resultado = await pool.query(
                `SELECT
                    autores.id,
                    autores.nome AS autor_nome,
                    COUNT(livros.id) AS quantidade_livros
                FROM autores
                LEFT JOIN livros
                    ON livros.autor_id = autores.id
                GROUP BY autores.id, autores.nome
                ORDER BY quantidade_livros DESC, autores.nome, autores.id`
            );

        const autores: LivrosPorAutor[] = [];

        for (const registro of resultado.rows) {
            autores.push({
                id: registro.id,
                autorNome: registro.autor_nome,
                quantidadeLivros: Number(registro.quantidade_livros)
            });
        }

        return autores;
    }

    async listarEmprestimosPorLivro(): Promise<EmprestimosPorLivro[]> {
        const resultado = await pool.query(
            `SELECT
                livros.id,
                livros.titulo,
                COUNT(emprestimos.id) AS total_emprestimos
            FROM livros
            LEFT JOIN emprestimos
                ON emprestimos.livro_id = livros.id
            GROUP BY livros.id, livros.titulo
            ORDER BY total_emprestimos DESC, livros.titulo, livros.id`
        );

        const livros: EmprestimosPorLivro[] = [];

        for (const registro of resultado.rows) {
            livros.push({
                id: registro.id,
                titulo: registro.titulo,
                totalEmprestimos: Number(registro.total_emprestimos)
            });
        }

        return livros;
    }
}