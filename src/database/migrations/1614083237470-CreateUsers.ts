import {MigrationInterface, QueryRunner, Table} from "typeorm";

/* 
    Arquivo gerado pelo script: yarn typeorm migrations:create -n CreateUsers
    Script configurado no package.json (CLI, command line interface)
    Diretório de migrations configurado no ormconfig.json ("migrationsDir")
*/

export class CreateUsers1614083237470 implements MigrationInterface {

    /*
        Para rodar as migrations: yarn typeorm migration:run
        Caso queira ver o banco de dados sqlite, pode baixar a extensão do VsCode SQLite (Cntrl + Shift + P) e buscar Open Database
        Ou abrir pelo programa Beekeeper Studio
        Para roolback, reverter algum comando: yarn typeorm migration:revert
    */

    public async up(queryRunner: QueryRunner): Promise<void> { // Método ".up()" quando quer rodar a migration
        await queryRunner.createTable(
            new Table(
                { // Tabela é um objeto
                    name: "users", // Nova tabela chamada Usuários
                    columns: [ // Array dos atributos dessa tabela
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true // ID é a chave primária
                        },
                        {
                            name: "name",
                            type: "varchar",
                            isNullable: false // Não pode ser nulo (Padrão se deixar sem)
                        },
                        {
                            name: "email",
                            type: "varchar",
                            isNullable: false
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()" // Banco de dados captura data e tempo do momento
                        }
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> { // Método ".down()" quando quer remover a migration que está executando
        await queryRunner.dropTable("users"); // Quando quiser deletar a tabela, dá o down pra o SGBD rodar o drop
    }

}
