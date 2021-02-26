/* 
    Seria o SurveysUserController, 
    mais o objetivo principal dele é enviar 
    o email e depois salvar a resposta.
*/
import { resolve } from 'path'; // Para ir e voltar nos diretorios do nodejs
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { AppError } from '../errors/AppError';

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
        const user = await usersRepository.findOne({email});

        // Se o usuário não existir, dar erro
        if(!user) {
            throw new AppError("User does not exists!");
        }

        // Capturar no findOne() o id do survey_id
        const survey = await surveysRepository.findOne({id: survey_id});
    
        // Se a pesquisa não existir, dar erro
        if(!survey) {
            throw new AppError("Survey does not exists!");
        }

        // Verificar se o usuário já respondeu essa pesquisa
        // Não deixando criar vários registrados de resposta para o mesmo usuário e pesquisa
        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            // Sem colchetes e como objeto único para ser uma condição de AND (&&)
            where: {
                user_id: user.id,
                value: null
            },
            // Para poder ver os dados do usuário e da pesquisa além do cadastro da pesquisa
            // Por meio dos ManyToOne e JoinColumn da classe SurveyUser
            relations: ["user", "survey"]
        });

        // Variável para passar pro handlebars colocar no texto
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "", // Vazio inicialmente, pois ainda tem que verificar se existe uma survey pra esse user
            link: process.env.URL_MAIL
        };

        // Enviar o email
        // __dirname captura o diretório exato de onde está essa aplicação, vai estar agora na pasta services
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        if(surveyUserAlreadyExists) {
            // Já que existe uma survey para esse user, atualizar o id das variáveis
            variables.id = surveyUserAlreadyExists.id;
            // Chamando o serviço de email pra enviar o email
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }
        
        // Se passou disso tudo, agora sim. 
        // Salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id: survey.id
        });
        // Esperando salvar o registro na tabela do banco de dados
        await surveysUsersRepository.save(surveyUser);

        // Se não existir a surveyUser id, vai colocar o id que acabou de criar
        variables.id = surveyUser.id;

        // Chamando o serviço de email pra enviar o email
        await SendMailService.execute(email, survey.title, variables, npsPath);

        // Retornando o registro de pesquisa cadastrada para um usuário
        return response.json(surveyUser);
    }
    
}

export { SendMailController };