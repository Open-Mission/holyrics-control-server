import Fastify from 'fastify';
import fastifyEnv from '@fastify/env';

const schema = {
  type: 'object',
  required: ['PORT', 'HOST'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000'
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0'
    },
    NODE_ENV: {
      type: 'string',
      default: 'development'
    }
  }
};

const options = {
  confKey: 'config', // default
  schema: schema,
  dotenv: true // loads .env file
};

// Augment FastifyInstance to include the config property
declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
      HOST: string;
      NODE_ENV: string;
    };
  }
}

const fastify = Fastify({
  logger: true
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.register(fastifyEnv, options);
    
    const port = parseInt(fastify.config.PORT, 10);
    const host = fastify.config.HOST;

    await fastify.listen({ port, host });
    console.log(`Server listening on http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
