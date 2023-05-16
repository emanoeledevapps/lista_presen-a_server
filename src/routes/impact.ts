import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';

export async function impactRoutes(fastify: FastifyInstance){
    fastify.get('/network-impact', async (request, reply) => {
        const impact = await prisma.impact.findMany();
        
        return {impact}
    })

    fastify.put('/network-impact', async (request, reply) => {
        const updateProps = z.object({
            carbon: z.number(),
            agua: z.number(),
            bio: z.number(),
            solo: z.number()
        });

        const {carbon, agua, bio, solo} = updateProps.parse(request.body);

        await prisma.impact.update({
            where:{
                id: '1'
            },
            data:{
                carbon,
                agua,
                bio, 
                solo
            }
        })
    })
}