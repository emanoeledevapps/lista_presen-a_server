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
}