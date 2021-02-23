// Comentários sobre o que cada import faz e como foi instalado antes de cada um.

/*
    Para controle do banco de dados será utilizado: yarn add typeorm reflect-metadata
    Caso ocorra erro de não encontre o reflect-metadata: npm install --save reflect-metadata
*/
import 'reflect-metadata' // Deve vir primeiro
/*
    Utilizar biblioteca de tipos para o express (em desenvolvimento): yarn add @types/express -D
    Utilizar biblioteca do TypeScript para interpretar e poder compilar o JS: yarn add typescript -D
    Para iniciar a bilbioteca do TS, utilizar: yarn tsc --init
    Biblioteca TS-node-dev para converter código em tempo de execução: yarn add ts-node-dev -D
*/
import express from 'express';
/*
    Banco de dados dev: yarn add sqlite3
*/
import './database' // Por padrão, não precisa escrever o index

const app = express(); // Iniciando instância do microframework Express

/*
    5 métodos de requisição HTTP mais utilizados:
    GET => Busca
    POST => salvar
    PUT => Alterar
    DELETE => Deletar
    PATCH => Alteração específica
*/

// http://localhost:3333/
app.get("/", (request, response) => {
    return response.json({message: "Hello World - NLW04"});
})

// 1º parâmetro => Rota
// 2º parâmetro => request e response
app.post("/", (request, response) => {
    return response.json({message: "Os dados foram salvos com sucessso!"});
})

// Criando o servidor na porta 3333, para iniciar: yarn dev
// Yarn dev configurado no package.json pelo Ts-node-dev
app.listen(3333, () => console.log("Server is running!"));