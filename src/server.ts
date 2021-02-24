import { app } from "./app";

/* 
    Criando o servidor na porta 3333, para iniciar: yarn dev
    Yarn dev configurado no package.json pelo Ts-node-dev
*/
app.listen(3333, () => console.log("Server is running!"));