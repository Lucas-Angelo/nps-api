import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';
import { SendMailController } from './controllers/SendMailController';

// Arquivo das rotas de requisições HTTP separadas por arquitetura do server.ts

const router = Router();

const userController = new UserController();
const surveysController = new SurveyController();
const sendMailController = new SendMailController();

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
router.post("/surveys", surveysController.create);
// Para ver todas as pesquisas (surveys)
router.get("/surveys", surveysController.show);

// Rota cadastro da pesquisa de um usuario
router.post("/sendMail", sendMailController.execute);

export { router }; // Retornando as rotas preenchidas para o server.ts
