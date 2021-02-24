import {MigrationInterface, QueryRunner, Table} from "typeorm";

/* 
    Arquivo gerado pelo script: yarn typeorm migration:create -n CreateSurveys
    Script configurado no package.json (CLI, command line interface)
    Diretório de migrations configurado no ormconfig.json ("migrationsDir")
*/

export class CreateSurveys1614168227609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                    {
                    name: "surveys",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "title",
                            type: "varchar"
                        },
                        {
                            name: "description",
                            type: "varchar"
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys");
    }

}
