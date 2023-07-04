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
    });

    fastify.get('/users', async (request, reply) => {
        const users = await prisma.user.findMany();
        return {users}
    });

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
    });

    fastify.get('/users_count', async (request, reply) => {
        const producersCount = await prisma.user.count({
            where:{
                userType: 1
            }
        })

        const activistsCount = await prisma.user.count({
            where:{
                userType: 2
            }
        })

        const researchersCount = await prisma.user.count({
            where:{
                userType: 2
            }
        })

        return{producersCount, activistsCount, researchersCount}
    })

    fastify.put('/user/level', async (request, reply) => {
        const propsUpdateLevel = z.object({
            id: z.string(),
            level: z.number()
        })

        const {id, level} = propsUpdateLevel.parse(request.body);

        await prisma.user.update({
            where:{
                id
            },
            data:{
                level
            }
        })

        return reply.status(200).send();
    })

    fastify.put('/user/update-photo', async (request, reply) => {
        const propsUpdatePhoto = z.object({
            wallet: z.string(),
            hashPhoto: z.string()
        })
        const {wallet, hashPhoto} = propsUpdatePhoto.parse(request.body);

        const user = await prisma.user.findUnique({
            where: {
                wallet
            }
        })

        if(!user){
            return reply.status(500).send();
        }

        await prisma.user.update({
            where:{
                id: user.id
            },
            data:{
                imgProfileUrl: hashPhoto
            }
        })

        return reply.status(200).send();
    })
}