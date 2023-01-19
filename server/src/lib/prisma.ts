/// Conexao com o banco de dados
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    log:['query']
});