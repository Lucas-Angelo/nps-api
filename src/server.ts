import express from 'express'; // Importando o express para express
// Utilizar biblioteca de tipos para o express (em desenvolvimento): yarn add @types/express -D
// Utilizar biblioteca do TypeScript para interpretar e poder compilar o JS: yarn add typescript -D
// Para iniciar a bilbioteca do TS, utilizar: yarn tsc --init
// Biblioteca TS-node-dev para converter código em tempo de execução: yarn add ts-node-dev -D

const app = express(); // Iniciando instância do microframework Express

/*
    5 métodos de requisição HTTP mais utilizados:
    GET => Busca
    POST => salvar
    PUT => Alterar
    DELETE => Deletar
    PATCH => Alteração específica
*/

// http://localhost:3333/users
app.get("/users", (request, response) => {
    return response.send("Hello World - NLW04");
})

// Criando o servidor na porta 3333, para iniciar: yarn dev
// Yarn dev configurado no package.json pelo Ts-node-dev
app.listen(3333, () => console.log("Server is running!"));