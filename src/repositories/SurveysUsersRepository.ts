import { EntityRepository, Repository } from "typeorm" // Pois a classe herda da biblioteca de repository
import { SurveyUser } from "../models/SurveyUser";

// Responsável por utilizar todos os métodos do repository TypeORM, ou seja, conexões e solicitações ao banco de dados
@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {}  // Para colocar esse classe como uma entidade de SurverUser

export { SurveysUsersRepository };