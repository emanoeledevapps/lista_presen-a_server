import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';

export async function delationRoutes(fastify: FastifyInstance){
    fastify.get('/delations', async (request, reply) => {
        const delations = await prisma.delation.findMany();
        return {delations}
    })
    
    fastify.post('/delations', async (request, reply) => {
        const createDelationProps = z.object({
            reportedUser: z.string(),
            title: z.string(),
            testimony: z.string(),
            proofPhoto: z.string()
        });
    
        const {reportedUser, title, testimony, proofPhoto} = createDelationProps.parse(request.body);
    
        await prisma.delation.create({
            data:{
                reportedUser,
                title,
                testimony,
                proofPhoto,
            }
        })
    
        return reply.status(201).send()
    })
}