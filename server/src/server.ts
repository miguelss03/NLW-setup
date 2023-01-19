//rotas de navegação
// elas que dirão aonde está cada rota especifica do projeto
// E através do prisma, que é importado dentro de lib, a conexão do banco é feita com o backend do projeto
import Fastify from "fastify";
import cors from '@fastify/cors';
import { prisma } from "./lib/prisma";
import { appRoutes } from "./routes";
const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
    port: 3333,
}).then(() => {
    console.log("Servidor HTTP rodando!!")
})