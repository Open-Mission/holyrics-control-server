import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function bibleRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/versions', {
    schema: {
      tags: ['Bible'],
      description: 'Get bible versions',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.bible.getBibleVersions(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/versions-v2', {
    schema: {
      tags: ['Bible'],
      description: 'Get bible versions (v2)',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.bible.getBibleVersionsV2(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/settings', {
    schema: {
      tags: ['Bible'],
      description: 'Get bible settings',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.bible.getBibleSettings(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/settings', {
    schema: {
      tags: ['Bible'],
      description: 'Set bible settings',
      body: z.any()
    }
  }, async (request, reply) => {
    const settings = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.bible.setBibleSettings(settings, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
