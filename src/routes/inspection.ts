import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';

export async function inspectionRoutes(fastify: FastifyInstance){
    fastify.post('/inspections', async (request, reply) => {
        const createInspectionProps = z.object({
            inspectionId: z.string(),
            createdBy: z.string(),
            createdAt: z.string(),
            categories: z.string(),
            userWallet: z.string()
        });
    
        const {inspectionId, createdBy, createdAt, categories, userWallet} = createInspectionProps.parse(request.body);
    
        await prisma.inspection.create({
            data:{
                inspectionId,
                createdBy,
                createdAt,
                categories,
                userWallet
            }
        })
    
        return reply.status(201).send()
    });

    fastify.get('/inspections/:activistWallet', async (request, reply) => {
        const reqParams = z.object({
            activistWallet: z.string()
        })

        const {activistWallet} = reqParams.parse(request.params);

        const inspections = await prisma.inspection.findMany({
            where: {
                userWallet: activistWallet
            }
        })

        return {inspections}
    });
}