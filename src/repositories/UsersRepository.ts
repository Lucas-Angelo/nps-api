import { EntityRepository, Repository } from "typeorm"; // Pois a classe herda da biblioteca de repository
import { User } from "../models/User";


// Responsável por utilizar todos os métodos do repository TypeORM, ou seja, conexões e solicitações ao banco de dados
@EntityRepository(User) // Para colocar esse classe como uma entidade de usuário
class UsersRepository extends Repository<User> {



}

export { UsersRepository };