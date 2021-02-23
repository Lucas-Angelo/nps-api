import { Router } from 'express';
import { UserController } from './controllers/UserController';

// Arquivo das rotas de requisições HTTP separadas por arquitetura do server.ts

const router = Router();

const userController = new UserController();

/*
    5 métodos de requisição HTTP mais utilizados:
    GET => Busca
    POST => salvar
    PUT => Alterar
    DELETE => Deletar
    PATCH => Alteração específica
*/

// Para o create de users do controller
router.post("/users", userController.create);

export { router }; // Retornando as rotas preenchidas para o server.ts
