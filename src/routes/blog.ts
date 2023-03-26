import {FastifyInstance} from 'fastify';
import { prisma } from '../lib/prisma';
import {z} from 'zod';
import { authenticated } from '../plugins/authenticated';

export async function blogRoutes(fastify: FastifyInstance){
    fastify.post('/post',{onRequest: [authenticated]}, async (request, reply) => {
        const createPostProps = z.object({
            title: z.string(),
            description: z.string(),
            bannerUrl: z.string(),
            bannerAlt: z.string(),
            bodyPost: z.string(),
            language: z.string(),
            keywords: z.string()
        });
    
        const {title, description, bannerUrl, bannerAlt, bodyPost, language, keywords} = createPostProps.parse(request.body);
    
        await prisma.post.create({
            data:{
                title,
                description,
                bannerUrl,
                bannerAlt,
                bodyPost,
                language,
                keywords
            }
        })
    
        return reply.status(201).send();
    })

    fastify.get('/posts/:language', async (request, reply) => {
        const reqParamsProps = z.object({
            language: z.string()
        })

        const {language} = reqParamsProps.parse(request.params);

        const posts = await prisma.post.findMany({
            where:{
                language
            },
            orderBy:{
                createdAt: 'desc'
            }
        });

        return {posts}
    })

    fastify.get('/post/:title', async (request, reply) => {
        const reqParamsProps = z.object({
            title: z.string()
        })

        const {title} = reqParamsProps.parse(request.params);

        const post = await prisma.post.findFirst({
            where:{
                title
            }
        });

        return {post}
    })
}