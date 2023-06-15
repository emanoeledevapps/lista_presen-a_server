import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';
import { authenticated } from '../plugins/authenticated';

export async function feedbackRoutes(fastify: FastifyInstance){
    fastify.post('/feedback', async (request, reply) => {
        const createFeedbackProps = z.object({
            title: z.string(),
            description: z.string(),
            wallet: z.string(),
            photoHash: z.string(),

        });
    
        const {title, description, wallet, photoHash} = createFeedbackProps.parse(request.body);
    
        await prisma.feedback.create({
            data:{
                title,
                description,
                wallet,
                photoHash
            }
        })
    
        return reply.status(201).send();
    })


    fastify.get('/feedback', async (request, reply) => {
        const feedbacks = await prisma.feedback.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        })

        return {feedbacks}
    })

    fastify.put('/feedback/status', async (request, reply) => {
        const updateFeedbackProps = z.object({
            id: z.string(),
            status: z.number(),
        });
    
        const {id, status} = updateFeedbackProps.parse(request.body);
    
        await prisma.feedback.update({
            where:{
                id
            },
            data:{
                status
            }
        })
    
        return reply.status(200).send();
    })

    fastify.post('/request-faucet', async (request, reply) => {
        const requestProps = z.object({
            wallet: z.string(),
        });
    
        const {wallet} = requestProps.parse(request.body);
    
        await prisma.requestFaucet.create({
            data:{
                wallet,
            }
        })
    
        return reply.status(201).send();
    })


    fastify.get('/request-faucet', async (request, reply) => {
        const requests = await prisma.requestFaucet.findMany({
            orderBy:{
                createdAt: 'asc'
            }
        })

        return {requests}
    })

    fastify.put('/request-faucet/status', async (request, reply) => {
        const requestProps = z.object({
            id: z.string(),
            status: z.number(),
        });
    
        const {id, status} = requestProps.parse(request.body);
    
        await prisma.requestFaucet.update({
            where:{
                id
            },
            data:{
                status
            }
        })
    
        return reply.status(200).send();
    })
}