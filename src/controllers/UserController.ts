import { Request, Response } from 'express'; // Express para as requisições e respostas
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository'; // Aqui onde está os comandos de acesso o banco de dados por meio do TypeORM de User

class UserController {

    async create(request: Request, response: Response) {
        // Desestruturação pois sabe que aqui está recebendo apenas o nome e email do JSON requisitado
       const { name, email } = request.body;
       
       /*
        Repository é um EntityManager que permite fazer as operações no banco de dados
        Comunicação com banco de dados é por meio do repositório
        Para cada entidade (nesse caso o usuário) terá o respositório responsável
       */
       const usersRepository = getCustomRepository(UsersRepository);

        /* 
            Verificar se já existe algum com esse email
            No SQL puro seria algo como: SELECT * FROM USERS WHERE EMAIL = "EMAIL";
        */
       const userAlreadyExists = await usersRepository.findOne({
           email
       });

       // Se já existir algum usuário com esse email, retorna erro 400
       if(userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            });
       }

       // Necessário criar o usuário utilizando o repositório primeiramente
       const user = usersRepository.create({
            name, email
       })

       // Agora aguardar a Promise do repositório salvar o usuário
       await usersRepository.save(user);

       return response.json(user);
    }

}

export { UserController };
