import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';

// Arquivo das rotas de requisições HTTP separadas por arquitetura do server.ts

const router = Router();

const userController = new UserController();
const surveysController = new SurveyController();

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

// Para o create de surveys do controller
router.post("/surveys", surveysController.create)

export { router }; // Retornando as rotas preenchidas para o server.ts
