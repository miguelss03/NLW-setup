//rotas de navegação
// elas que dirão aonde está cada rota especifica do projeto
// E através da importação do prisma client, a conexão do banco é feita com o backend do projeto
import Fastify from "fastify";
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';

const app = Fastify()
const prisma = new PrismaClient();

app.register(cors)

app.get('/hello', async () => {
    const habits = await prisma.habitat.findMany()

    return habits
})

app.listen({
    port: 3333,
}).then(() => {
    console.log("Servidor HTTP rodando!!")
})