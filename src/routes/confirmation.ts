import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';

export async function confirmationRoutes(fastify: FastifyInstance){
    fastify.get('/confirmations', async (request, reply) => {
        const confirmations = await prisma.confirmation.findMany({
            orderBy:{
                createdAt: 'asc'
            }
        });

        return {confirmations};
    });

    fastify.post('/confirmations', async (request, reply) => {
        const confirmationProps = z.object({
            name: z.string(),
            confirmation: z.boolean(),
            age: z.number().optional()
        });

        const {name, confirmation, age} = confirmationProps.parse(request.body);

        const peopleExists = await prisma.confirmation.findFirst({
            where:{
                name: name.toUpperCase()
            }
        })

        if(peopleExists){
            return reply.status(500).send({
                text: 'people exists'
            })
        }

        const confirmationPeople = await prisma.confirmation.create({
            data:{
                name: name.toUpperCase(),
                confirmation,
                age
            }
        })

        return reply.status(201).send({confirmationPeople});
    })
}