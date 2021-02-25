import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';


describe("Users", () => {

    // Antes de tudo, criar as migrations para o banco de dados test ter tabelas
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user", async () => {
        // Criando uma requisicao pela biblioteca supertest
        const response = await request(app).post("/users")
        .send({
            email: "user@example.com",
            name: "User Example",
        });

        // Espara-se que seja 201 pois assim o test funcionou e criou o usuário
        expect(response.status).toBe(201);
    });

    it("Should not be able to create a user with exists email", async () => {
        // Criando uma requisicao pela biblioteca supertest
        const response = await request(app).post("/users")
        .send({
            email: "user@example.com",
            name: "User Example",
        });

        // Espara-se que seja 400 pois vai dar erro ao criar usuario com email duplicado
        expect(response.status).toBe(400);
    });

});