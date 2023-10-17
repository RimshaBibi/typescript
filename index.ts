import fastify, { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()


const app: FastifyInstance = fastify({ logger: true });
import userRoutes from "./routes/user.js"



const PORT: number = parseInt(process.env.PORT || '8080');


// Register the user routes
app.register(userRoutes);

// console.log(`path is  ${path.join(__dirname,'../frontend/public')}`)


app.register(fastifyStatic,
   {
  root: path.join(__dirname,'../frontend/public'),
  prefix: '/', 
});

app.get('/', async (request, reply) => {
  try {
    reply.type('text/html');
    await reply.sendFile('index.html');
  } catch (err) {
    reply.code(500).send('Internal Server Error');
  }
});



app.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
