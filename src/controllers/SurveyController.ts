import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyController{

    async create(request: Request, response: Response) {
        // Desestruturação pois sabe que aqui está recebendo apenas o nome e email do JSON requisitado
        const { title, description } = request.body; // Controller recebe o título e descrição do body da requisição HTTP

        // Para receber as funções necessárias
        const surveysRepository = getCustomRepository(SurveysRepository);

        // Criar o survey passando o que foi recebido
        const survey = surveysRepository.create({
            title,
            description
        })

        // Salvar o survey no banco de dados
        await surveysRepository.save(survey);

        // 201 é o código para informar quando se cria algo corretamente no HTTP
        return response.status(201).json(survey); // Retorna o código e o que foi criado

    }

    // Controller para criar a rota que retorna todas as pesquisas (surveys)
    async show(request: Request, response: Response){
        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find(); // .find() é o método para listar todos os registros da tabela

        return response.json(all);
    }

}

export { SurveyController };