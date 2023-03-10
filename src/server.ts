import fastify from 'fastify';
import cors from '@fastify/cors';

import { delationRoutes } from './routes/delation';
import { userRoutes } from './routes/user';

const app = fastify();
app.register(cors, {
    origin: true
});
app.register(userRoutes);
app.register(delationRoutes);

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
})
.then(() => {
    console.log('HTTP Server Running!')
})