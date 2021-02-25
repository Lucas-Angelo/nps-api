/* 
    Seria o SurveysUserController, 
    mais o objetivo principal dele é enviar 
    o email e depois salvar a resposta.
*/
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {

    // Método que vai executar o envio de e-mail
    async execute(request: Request, response: Response) {

        // Irá receber o email do usuário e a pesquisa
        const { email, survey_id } = request.body;

        // Precisa confirmar se o e-mail existe (cadastrado) na plataforma
        const usersRepository = getCustomRepository(UsersRepository);
        // Precisa verificar se a pesquisa também existe
        const surveysRepository = getCustomRepository(SurveysRepository);
        // Será o utilizado nos métodos
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // Verificar se o usuário existe
        const userAlreadyExists = await usersRepository.findOne({email});

        // Se o usuário não existir, dar erro
        if(!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        // Capturar no findOne() o id do survey_id
        const survey = await surveysRepository.findOne({id: survey_id});
    
        // Se a pesquisa não existir, dar erro
        if(!survey) {
            return response.status(400).json({
                error: "Survey does not exists",
            });
        }
        
        // Se passou disso tudo, agora sim. 
        // Primeiro: salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id: survey.id
        })
        // Esperando salvar o registro na tabela do banco de dados
        await surveysUsersRepository.save(surveyUser);

        // Segundo: enviar o email
        await SendMailService.execute(email, survey.title, survey.description);

        return response.json(surveyUser);
    }
    
}

export { SendMailController };