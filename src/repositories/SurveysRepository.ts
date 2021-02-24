import { EntityRepository, Repository } from "typeorm"; // Pois a classe herda da biblioteca de repository
import { Survey } from "../models/Survey";

// Responsável por utilizar todos os métodos do repository TypeORM, ou seja, conexões e solicitações ao banco de dados
@EntityRepository(Survey) // Para colocar esse classe como uma entidade de Survey
class SurveysRepository extends Repository<Survey> {}

export { SurveysRepository };