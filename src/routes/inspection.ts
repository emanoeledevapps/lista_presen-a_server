import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';
import { authenticated } from '../plugins/authenticated';

export async function inspectionRoutes(fastify: FastifyInstance){
    fastify.post('/inspections', async (request, reply) => {
        const createInspectionProps = z.object({
            inspectionId: z.string(),
            createdBy: z.string(),
            createdAt: z.string(),
            propertyData: z.string(),
            userWallet: z.string()
        });
    
        const {inspectionId, createdBy, createdAt, propertyData, userWallet} = createInspectionProps.parse(request.body);
    
        await prisma.inspection.create({
            data:{
                inspectionId,
                createdBy,
                createdAt,
                propertyData,
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
                userWallet: activistWallet.toUpperCase()
            }
        })

        return {inspections}
    });

    fastify.get('/categories', async (request, reply) => {
        const categories = await prisma.category.findMany({
            include:{
                SubCategory: true,
            }
        })
        return {categories}
    });

    fastify.get('/subCategories', async (request, reply) => {
        const subCategories = await prisma.subCategory.findMany({
            orderBy:{
                order: 'asc'
            }
        })
        return {subCategories}
    });

    fastify.put('/inspections/:inspectionId/finishInspection', {onRequest: [authenticated]},async (request, reply) => {
        const createInspectionParams = z.object({
            inspectionId: z.string()
        });

        const createInspectionBody = z.object({
            resultIndices: z.string(),
            resultCategories: z.string(),
            biodversityIndice: z.string(),
            proofPhoto: z.string()
        });
    
        const {proofPhoto, resultCategories, resultIndices, biodversityIndice} = createInspectionBody.parse(request.body);
        const {inspectionId} = createInspectionParams.parse(request.params);
    
        await prisma.inspection.update({
            where:{
                inspectionId
            },
            data:{
                proofPhoto,
                resultCategories,
                resultIdices: resultIndices,
                status: 2,
                biodversityIndice
            }
        })
    
        return reply.status(201).send()
    });

    fastify.get('/inspection/:inspectionId', async (request, reply) => {
        const createInspectionParams = z.object({
            inspectionId: z.string()
        });
        const {inspectionId} = createInspectionParams.parse(request.params);
        
        const inspection = await prisma.inspection.findFirst({
            where:{
                inspectionId
            }
        })
        return {inspection}
    });
}