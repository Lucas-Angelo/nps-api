import {Request, Response} from 'express';
import {getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {

    /*

        Notas de NPS: 1, 2, 3, 4, 5, 6, 7, 8, 9 e 10.
        Detratores: 0 - 6
        Passivos: 7 - 8
        Promotores: 9 - 10

        Cálculo do NPS:
        (Número de promotores - Número de Detratores) / (Número de respondentes) x 100

    */

    async execute(request: Request, response: Response) {
        // Obrigatório ter o id da survey 
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // Captura todos os avaliadores
        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        // Captura apenas os detratores do total
        const detractors = surveysUsers.filter(
            survey => (survey.value >= 0 && survey.value <= 6)
        ).length;

        // Captura apenas os promotores do total
        const promoters = surveysUsers.filter(
            survey => (survey.value >= 9 && survey.value <= 10)
        ).length;

        // Captura apenas os passivos do total, usado apenass para mostrar
        const passives = surveysUsers.filter(
            survey => (survey.value >= 7 && survey.value <= 8)
        ).length;

        // Total de answers
        const totalAnswers = surveysUsers.length;

        const calculate = Number(
            (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
        );

        return response.json({
            detractors,
            promoters,
            passives,
            totalAnswers,
            nps: calculate
        });

    }

}

export { NpsController };