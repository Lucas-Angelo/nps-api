import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid} from 'uuid'; // Importando o uuid v4 e renomeando pra uuid

@Entity("users") // Do TypeORM, pois será uma entidade do banco de dados, utilizada no controller
class User {

    @PrimaryColumn()
    readonly id: string; // o readonly para não deixar quem tem informação do id mudar o valor, nesse caso o controller poderá só ler

    @Column() // Poderia passar o nome da coluna: @Column("name"), mas o atributo já está com mesmo nome
    name: string;

    @Column()
    email: string;

    @CreateDateColumn() // Para já capturar a data e fazer a formatação
    created_at: Date;

    /*
        A geração do uuID automático não será por meio do SGBD, e sim aqui pelo código
        Utilizando a bilioteca: yarn add uuid
        Tipos da biblioteca uuid: yarn add @types/uuid -D
    */
   constructor() {
       // Se esse ID não existir, gerar um id
       if(!this.id) {
           this.id = uuid();
       }
   }

}

export { User }