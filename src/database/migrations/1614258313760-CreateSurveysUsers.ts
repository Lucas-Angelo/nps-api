import {IsNull, MigrationInterface, QueryRunner, Table} from "typeorm";

/* 
    Arquivo gerado pelo script: yarn typeorm migration:create -n CreateSurveysUsers
    Script configurado no package.json (CLI, command line interface)
    Diretório de migrations configurado no ormconfig.json ("migrationsDir")
*/

export class CreateSurveysUsers1614258313760 implements MigrationInterface {

    /*
        Para rodar as migrations: yarn typeorm migration:run
        Caso queira ver o banco de dados sqlite, pode baixar a extensão do VsCode SQLite (Cntrl + Shift + P) e buscar Open Database
        Ou abrir pelo programa Beekeeper Studio
        Para roolback, reverter algum comando: yarn typeorm migration:revert
    */

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table (
                    {
                    name: "surveys_users",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "user_id", // ID do usuário que respondeu a survey
                            type: "uuid"
                        },
                        {
                            name: "survey_id", // ID da survey respondida pelo user
                            type: "uuid"
                        },
                        {
                            name: "value", // Avaliação do usuário
                            type: "number",
                            isNullable: true // Permite que seja nulo de início, antes do user responder
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ],
                    // Chaves estrageiras utilizadas para associar as tabelas
                    // Poderia ser feito com: await querryRunner.createForeignKey(); mas no drop da tabela, teria que apagar as FK primeiro.
                    foreignKeys: [
                        // Associando id do usuario da tabela user, com o user_id dessa tabela
                        {
                            name: "FKUser",
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            columnNames: ["user_id"],
                            // Esses seguites comandos apagam ou atualizam o registro de survey caso aconteca algo com o user
                            onDelete: "CASCADE", // Caso o user for removido, cascade na tabela filha (essa) deletando
                            onUpdate: "CASCADE" // Caso o user for removido, cascade na tabela filha (essa) atualizando
                        },           
                        // Associando o id da pesquisa da tabela survey, com o survey_id dessa tabela           
                        {
                            name: "FKSurvey",
                            referencedTableName: "surveys",
                            referencedColumnNames: ["id"],
                            columnNames: ["survey_id"],
                            // Esses seguites comandos apagam ou atualizam o registro de survey caso aconteca algo com a survey
                            onDelete: "CASCADE", // Caso o user for removido, cascade na tabela filha (essa) deletando
                            onUpdate: "CASCADE" // Caso o user for removido, cascade na tabela filha (essa) atualizando
                        }
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Se tiver feito sido utilizando o: await querryRunner.createForeignKey();
        // Será necessário apagar todas as ForeignKeys primeiro antes de dar o dropTable
        await queryRunner.dropTable("surveys_users");
    }

}
