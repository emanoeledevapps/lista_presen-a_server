import fastify from 'fastify';
import cors from '@fastify/cors';

import { confirmationRoutes } from './routes/confirmation';


const app = fastify();

app.register(confirmationRoutes);

app.register(cors, {
    origin: true
});

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
})
.then(() => {
    console.log('HTTP Server Running!')
})