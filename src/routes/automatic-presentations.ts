import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function automaticPresentationsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Automatic Presentations'],
      description: 'Get all automatic presentations',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.automaticPresentations.getAutomaticPresentations(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/:id', {
    schema: {
      tags: ['Automatic Presentations'],
      description: 'Get automatic presentation by ID',
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.automaticPresentations.getAutomaticPresentation(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/play', {
    schema: {
      tags: ['Automatic Presentations'],
      description: 'Play automatic presentation',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.automaticPresentations.playAutomaticPresentation(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/player-info', {
    schema: {
      tags: ['Automatic Presentations'],
      description: 'Get automatic presentation player info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.automaticPresentations.getAutomaticPresentationPlayerInfo(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/player-action', {
    schema: {
      tags: ['Automatic Presentations'],
      description: 'Perform automatic presentation player action',
      body: z.object({
        action: z.string()
      }).passthrough()
    }
  }, async (request, reply) => {
    const { action, ...params } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.automaticPresentations.automaticPresentationPlayerAction(action, params, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
