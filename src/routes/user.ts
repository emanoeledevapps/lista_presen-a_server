import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';
import { authenticated } from '../plugins/authenticated';

export async function userRoutes(fastify: FastifyInstance){
    fastify.get('/me', {onRequest: [authenticated]},async (request, reply) => {
        const user = await prisma.user.findUnique({
            where:{
                wallet: request.user.wallet.toUpperCase()
            }
        });
        
        return {user}
    })

    fastify.get('/users', async (request, reply) => {
        const users = await prisma.user.findMany();
        return {users}
    })

    fastify.get('/user/:wallet', async (request, reply) => {
        const requestProps = z.object({
            wallet: z.string()
        })
        const {wallet} = requestProps.parse(request.params);

        const user = await prisma.user.findUnique({
            where:{
                wallet: wallet.toUpperCase()
            }
        })

        return {user}
    })
}