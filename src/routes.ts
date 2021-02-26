import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';
import { SendMailController } from './controllers/SendMailController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

// Arquivo das rotas de requisições HTTP separadas por arquitetura do server.ts

const router = Router();

const userController = new UserController();
const surveysController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

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

// Rota para resposta de pesquisa de satisfação
router.get("/answers/:value", answerController.execute);

// Rota para mostrar o NPS de uma pesquisa
router.get("/nps/:survey_id", npsController.execute);

export { router }; // Retornando as rotas preenchidas para o server.ts
