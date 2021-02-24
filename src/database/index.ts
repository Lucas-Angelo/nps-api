import { Connection, createConnection, getConnectionOptions } from "typeorm"; // TypeORM para abrir conexão com banco de dados Sqlite3

export default async (): Promise<Connection> => {

    const defaultOptions = await getConnectionOptions(); // Captura todas as configurações do ormgconfig.json

    // Agora vai retornar o banco de dados de teste ou de produção
    return createConnection(
        /* 
            O Object vai verificar se a variável de ambiente do comando é test
            se for test, irá passar o banco de dados test, caso contrário,
            irá passar o banco de dados default iniciar.
        */
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === 'test' 
            ? "./src/database/database.test.sqlite" 
            : defaultOptions.database
        })
    );
};