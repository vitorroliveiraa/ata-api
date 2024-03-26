import { getClient } from './db.js'
import fs from 'fs';
import path from 'path';

async function executeScript(client, scriptPath) {
	try {
		console.time(`Script ${scriptPath} executado`); // Inicia a contagem de tempo
		const script = fs.readFileSync(scriptPath, 'utf8');
		await client.query(script);
		console.timeEnd(`Script ${scriptPath} executado`); // Encerra a contagem de tempo e imprime o tempo decorrido

		console.log(`Script ${scriptPath} executado com sucesso.`);

	} catch (error) {
		console.error(`Erro ao executar o script ${scriptPath}:`, error);
	}
}


async function main() {
	const client = await getClient();
	try {
		const sqlScriptPath = path.join(process.cwd(), 'src', 'database', 'migrations', 'index.sql');
		await executeScript(client, sqlScriptPath);

	} catch (error) {
		console.error('Erro durante a execução dos scripts:', error);
	} finally {
		client.release();
	}
}

main();
