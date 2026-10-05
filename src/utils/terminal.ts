import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const terminal = createInterface({
    input: stdin,
    output: stdout
});

export async function perguntar(mensagem: string): Promise<string> {
    const resposta = await terminal.question(mensagem);
    return resposta.trim();
}

export function fecharTerminal(): void {
    terminal.close();
}