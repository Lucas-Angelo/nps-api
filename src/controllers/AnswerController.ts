import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {

    /*
        Estrutura de um link:
        http://localhost:3333/answers/1?u=3a0e4f76-7063-4628-97c8-114f1f5b99b8

        Tipos de parâmetros:
            - Body params: dentro do corpo da requisição. Ex: Json no Insomnia
            - Route params: Parametros que compõe a rota, está na rota. Identificação é estar entre / com valores. Ex: /answers/:value
            - Query Parameters: A partir do ?, utilizados para busca e paginação. Não sou obrigatórios. ?chave=valor. Ex: ?u=value
    */

    async execute(request: Request, response: Response) {

        // Para capturar o route params (Nota da avaliação)
        const { value } = request.params;
        // Para capturar o query params (Qual relação de survey e user)
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        
        // Primeiro, verificar se o u (surveyUser) que recebemos é válido.
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });
        // Se não existir esse surveyUser, retorna 400 e mensagem de erro
        if(!surveyUser) {
            throw new AppError("Survey User does not exists!");
        }

        // Caso o surveyUser existir, sobrescreve o null que estava no banco de dados, pelo valor avaliado
        surveyUser.value = Number(value); // Com o parse, forçar o value ser um number

        // Salvar no banco de dados a nota avaliado para a survey do user
        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }

}

export { AnswerController };