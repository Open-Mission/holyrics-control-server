import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/login/token', {
    schema: {
      tags: ['Auth'],
      description: 'Login with a new token',
      querystring: z.object({
        token: z.string()
      })
    }
  }, async (request, reply) => {
    const { token } = request.query;
    try {
      const auth = await holyrics.auth.loginWithToken(token);
      reply.setHolyricsCookies(auth);
      return { status: 'ok', message: 'Logged in with token' };
    } catch (error: any) {
      fastify.log.error(error);
      const statusCode = error.message.includes('fetch') || error.message.includes('ECONNREFUSED') ? 502 : 401;
      return reply.status(statusCode).send({ status: 'error', message: error.message });
    }
  });

  app.get('/login/hash', {
    schema: {
      tags: ['Auth'],
      description: 'Login/Re-authenticate using the stored token (from cookies or environment)'
    }
  }, async (request, reply) => {
    const existingAuth = request.getHolyricsAuth();
    // Try to get token from cookie or fallback to environment
    const token = existingAuth?.token || fastify.config.HOLYRICS_TOKEN;

    if (!token || token.trim() === '') {
      return reply.status(401).send({ 
        status: 'error', 
        message: 'No token found. Please set HOLYRICS_TOKEN in .env or login with /auth/login/token?token=... first.' 
      });
    }
    
    try {
      // Perform the two-step Auth flow described in the documentation
      const auth = await holyrics.auth.loginWithHash(token);
      reply.setHolyricsCookies(auth);
      return { status: 'ok', message: 'Logged in with hash (re-authenticated)', auth: { ...auth, token: '***' } };
    } catch (error: any) {
      fastify.log.error(error);
      const statusCode = error.message.includes('fetch') || error.message.includes('ECONNREFUSED') ? 502 : 401;
      return reply.status(statusCode).send({ status: 'error', message: error.message });
    }
  });

  app.get('/me', async (request, reply) => {
    const auth = request.getHolyricsAuth();

    if (!auth) {
      return reply.status(401).send({ status: 'error', message: 'Not authenticated' });
    }

    return { 
      status: 'ok', 
      auth: { ...auth, token: '***' } 
    };
  });

  app.post('/logout', async (request, reply) => {
    reply.clearHolyricsCookies();
    return { status: 'ok', message: 'Logged out successfully' };
  });
}
