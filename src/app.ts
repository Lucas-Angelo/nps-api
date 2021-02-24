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
     // Por padrão, não precisa escrever o index
*/
import './database'
/*
    Importando rotas criadas por onde são feitas cada requisição
*/
import { router } from './routes';

const app = express(); // Iniciando instância do microframework Express

app.use(express.json()) // Habilitar o uso de formato JSON
app.use(router) // Funciona como Middleware para utilizar as rotas criadas

export { app };