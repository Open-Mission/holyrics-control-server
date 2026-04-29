import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function mediaPlayerRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/info', {
    schema: {
      tags: ['Media Player'],
      description: 'Get media player info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.mediaPlayer.getMediaPlayerInfo(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/action', {
    schema: {
      tags: ['Media Player'],
      description: 'Perform media player action',
      body: z.object({
        action: z.string()
      }).passthrough()
    }
  }, async (request, reply) => {
    const { action, ...params } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.mediaPlayer.mediaPlayerAction(action, params, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
