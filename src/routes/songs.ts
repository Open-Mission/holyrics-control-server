import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function songsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Songs'],
      description: 'Get all songs',
      querystring: z.object({
        fields: z.string().optional().describe('Comma separated fields to return')
      })
    }
  }, async (request, reply) => {
    const { fields } = request.query;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.songs.getAll(fields, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/:id', {
    schema: {
      tags: ['Songs'],
      description: 'Get song by ID',
      params: z.object({
        id: z.string()
      }),
      querystring: z.object({
        fields: z.string().optional().describe('Comma separated fields to return')
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { fields } = request.query;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.songs.getById(id, fields, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/search', {
    schema: {
      tags: ['Songs'],
      description: 'Search songs',
      body: z.object({
        text: z.string()
      }).passthrough()
    }
  }, async (request, reply) => {
    const { text, ...options } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.songs.search(text, options, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/show', {
    schema: {
      tags: ['Songs'],
      description: 'Show song on screen',
      body: z.object({
        id: z.string(),
        initialIndex: z.number().int().optional()
      })
    }
  }, async (request, reply) => {
    const { id, initialIndex } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.songs.show(id, initialIndex, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/real-time-key', {
    schema: {
      tags: ['Songs'],
      description: 'Get real-time song key',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.songs.getRealTimeSongKey(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/real-time-key', {
    schema: {
      tags: ['Songs'],
      description: 'Set real-time song key',
      body: z.object({
        key: z.string()
      })
    }
  }, async (request, reply) => {
    const { key } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.songs.setRealTimeSongKey(key, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
