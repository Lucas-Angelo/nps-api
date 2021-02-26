import { Request, Response } from 'express'; // Express para as requisições e respostas
import { getCustomRepository, UpdateDateColumn } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository'; // Aqui onde está os comandos de acesso o banco de dados por meio do TypeORM de User
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
class UserController {

    async create(request: Request, response: Response) {
        // Desestruturação pois sabe que aqui está recebendo apenas o nome e email do JSON requisitado
       const { name, email } = request.body;

       // Obrigatório apra cadastrar usuário
        const scheme = yup.object().shape({
            name: yup.string().required("Nome é obrigatório!"),
            email: yup.string().email("Email inválido!").required("Email é obrigatório")
        })

        // Primeira forma de validar:
        // Valindo o objeto, se não for válido:
        //    if( !(await scheme.isValid(request.body)) ) {
        //        return response.status(400).json (
        //            {error: "Validation Failed!"}
        //        );
        //    }

        // Segunda forma de validar
        // Com try catch tratando:
        try {
            await scheme.validate(request.body, {abortEarly: false}); // AbortEarly para fazer todas as validações
        } catch (err) {
            throw new AppError(err);
        }
       
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
        throw new AppError("User already exists!");
       }

       // Necessário criar o usuário utilizando o repositório primeiramente
       const user = usersRepository.create({
            name, email
       })

       // Agora aguardar a Promise do repositório salvar o usuário
       await usersRepository.save(user);

       return response.status(201).json(user);
    }

}

export { UserController };
