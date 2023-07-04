import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';

export async function profileRoutes(fastify: FastifyInstance){
    fastify.put('/update_photo', async (request, reply) => {
        const updateProps = z.object({
            wallet: z.string(),
            hash: z.string()
        })

        const {wallet, hash} = updateProps.parse(request.body);

        const upload = await prisma.user.update({
            where:{
                wallet: wallet.toUpperCase()
            },
            data:{
                imgProfileUrl: hash
            }
        })

        return upload;
    })
}