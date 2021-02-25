import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid} from 'uuid'; // Importando o uuid v4 e renomeando pra uuid
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("surveys_users") // Do TypeORM, pois será uma entidade do banco de dados, utilizada no controller
class SurveyUser {

    @PrimaryColumn()
    readonly id: string; // o readonly para não deixar quem tem informação do id mudar o valor, nesse caso o controller poderá só ler

    @Column() // Poderia passar o nome da coluna: @Column("user_id"), mas o atributo já está com mesmo nome
    user_id: string;

    // Para ver todas as pesquisas respondidas por um usuário
    // Pode existir muitas pesquisas pra um usuário, então é bom ter esse objeto de relacionamento
    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @Column()
    survey_id: string;

    // Para ver todos os usuários que responderam uma pesquisa
    // Pode existir muitos usuários pra uma pesquisa, então é bom ter esse objeto de relacionamento
    @ManyToOne(() => Survey)
    @JoinColumn({name: "survey_id"})
    survey: Survey;

    @Column()
    value: number;

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

export { SurveyUser };