import Fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import fastifySwagger from '@fastify/swagger';
import scalarFastify from '@scalar/fastify-api-reference';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import { serializerCompiler, validatorCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from './libs/holyrics/index.js';
import routes from './routes/index.js';
import authRoutes from './routes/auth.js';

const envSchema = z.object({
  PORT: z.string().default('3000'),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.string().default('development'),
  HOLYRICS_URL: z.string().default('http://localhost:8091'),
  HOLYRICS_TOKEN: z.string().default('')
});

type Env = z.infer<typeof envSchema>;

const options = {
  confKey: 'config',
  schema: {
    type: 'object',
    required: ['PORT', 'HOST'],
    properties: {
      PORT: { type: 'string', default: '3000' },
      HOST: { type: 'string', default: '0.0.0.0' },
      NODE_ENV: { type: 'string', default: 'development' },
      HOLYRICS_URL: { type: 'string', default: 'http://localhost:8091' },
      HOLYRICS_TOKEN: { type: 'string', default: '' }
    }
  },
  dotenv: true
};

declare module 'fastify' {
  interface FastifyInstance {
    config: Env;
  }
  interface FastifyRequest {
    getHolyricsAuth(): { token: string; sid: string; nonce: string; rid: number } | undefined;
  }
  interface FastifyReply {
    setHolyricsCookies(auth: { token: string; sid: string; nonce: string; rid: number }): void;
    clearHolyricsCookies(): void;
  }
}

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z', // Formata a hora
        ignore: 'pid,hostname',
      }
    }
  }
});

const fastify = app.withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.decorateRequest('getHolyricsAuth', function() {
  const token = this.cookies.holyrics_token;
  const sid = this.cookies.holyrics_sid;
  const nonce = this.cookies.holyrics_nonce;
  const ridStr = this.cookies.holyrics_rid;

  if (!token || !sid || !nonce || !ridStr) {
    return undefined;
  }

  return { token, sid, nonce, rid: parseInt(ridStr, 10) };
});

app.decorateReply('setHolyricsCookies', function(auth: { token: string; sid: string; nonce: string; rid: number }) {
  const cookieOptions = {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const
  };

  this.setCookie('holyrics_token', auth.token, cookieOptions);
  this.setCookie('holyrics_sid', auth.sid, cookieOptions);
  this.setCookie('holyrics_nonce', auth.nonce, cookieOptions);
  this.setCookie('holyrics_rid', auth.rid.toString(), cookieOptions);
});

app.decorateReply('clearHolyricsCookies', function() {
  const cookieOptions = { path: '/' };
  this.clearCookie('holyrics_token', cookieOptions);
  this.clearCookie('holyrics_sid', cookieOptions);
  this.clearCookie('holyrics_nonce', cookieOptions);
  this.clearCookie('holyrics_rid', cookieOptions);
});

const start = async () => {
  try {
    await app.register(fastifyEnv, options);
    
    // Initialize Holyrics client with loaded environment variables
    holyrics.configure(app.config.HOLYRICS_URL, app.config.HOLYRICS_TOKEN);

    // Register Swagger
    await app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Holyrics Control Server API',
          description: 'API for controlling Holyrics remotely',
          version: '1.0.0',
        },
        servers: [
          {
            url: `http://${app.config.HOST === '0.0.0.0' ? 'localhost' : app.config.HOST}:${app.config.PORT}`,
            description: 'Local server'
          }
        ],
      },
      transform: jsonSchemaTransform,
    });

    // Register Scalar
    await (app as any).register(scalarFastify, {
      routePrefix: '/docs',
      configuration: {
        spec: {
          content: () => app.swagger(),
        },
      },
    });

    // Register CORS
    await app.register(fastifyCors, {
      origin: true, // In production, this should be the specific frontend URL
      credentials: true, // Important for cookies
    });

    // Register cookies
    await app.register(fastifyCookie, {
      secret: "holyrics-secret", // should be in env in production
      hook: 'onRequest',
    });

    // Register routes - using the typed instance
    await fastify.register(authRoutes, { prefix: '/api/v1/auth' });
    await fastify.register(routes, { prefix: '/api/v1' });

    // Expose OpenAPI JSON
    app.get('/openapi.json', { schema: { hide: true } }, async () => {
      return app.swagger();
    });

    const port = parseInt(app.config.PORT, 10);
    const host = app.config.HOST;

    await app.listen({ port, host });
    console.log(`Server listening on http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
