BACKEND da aplicação ---> API RESTFULL -> rotas HTTP;
utilização do Node.JS como processador de rotas na camada web
Recursos de rotas de navegação. que é levado direto para o frontend
Ferramentas que auxiliam na navegação e rotas são o Express e o Fastify.
--------------------------------------------------------------------------
Neste projeto. É utilizado o fastify.

-> Utilização do ORM Prisma.
-> ORM são uma forma de automatizar o banco de dados, fazendo a modelagem de suas tabelas e colunas de forma automatica.
--- 

Bando de dados: SQLite
Através desse comando ---npx prisma init --datasource-provider SQLite-- Nós indicamos para o prisma que queremos utilizar ele com o
Bando de dados do tipo sqlite, poderiamos sim utilizar qualquer outro banco, como mongodb, mysql mas entao teria que entrar na documentação do prisma para entender. 
Mas em resumo, o prisma é um intermédio entre as regras de negocios e banco de dados automatizado
---

E através da importação do prisma client nas rotas de navegação do projeto, a conexão do banco é feita com o backend do projeto.
---
#COMANDO ->
 import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
---

Intergração do CORS no backend
-> Cors é como se fosse uma medida de segurança que restringe acessos externos do nosso backend e banco de dados
PS. O CORS vem direto do fastify através do comando: npm i @fastify/cors.


FRONT END da aplicação --> Vite: 

