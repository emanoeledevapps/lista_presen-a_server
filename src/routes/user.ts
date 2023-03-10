import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';

export async function userRoutes(fastify: FastifyInstance){
    fastify.get('/users', async (request, reply) => {
        const users = await prisma.user.findMany();
        return {users}
    })
    
    fastify.post('/users', async (request, reply) => {
        const createUserProps = z.object({
            name: z.string(),
            wallet: z.string(),
            userType: z.number(),
            geoLocation: z.string().optional(),
            propertyGeolocation: z.string().optional()
        });
    
        const {name, wallet, userType, geoLocation, propertyGeolocation} = createUserProps.parse(request.body);

        const userExists = await prisma.user.findUnique({
            where:{
                wallet: wallet,
            }
        })

        if(userExists) {
            return reply.status(500).send()
        }
    
        await prisma.user.create({
            data:{
                name,
                wallet,
                userType,
                geoLocation,
                propertyGeolocation
            }
        })
    
        return reply.status(201).send()
    })

    fastify.get('/user/:wallet', async (request, reply) => {
        const requestProps = z.object({
            wallet: z.string()
        })
        const {wallet} = requestProps.parse(request.params);

        const user = await prisma.user.findUnique({
            where:{
                wallet
            }
        })

        return {user}
    })
}