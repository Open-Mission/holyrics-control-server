import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function announcementsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Announcements'],
      description: 'Get all announcements',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.announcements.getAnnouncements(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/:id', {
    schema: {
      tags: ['Announcements'],
      description: 'Get announcement by ID',
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.announcements.getAnnouncement(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/show', {
    schema: {
      tags: ['Announcements'],
      description: 'Show announcement on screen',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.announcements.showAnnouncement(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/custom-messages', {
    schema: {
      tags: ['Announcements'],
      description: 'Get custom messages',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.announcements.getCustomMessages(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/show-custom-message', {
    schema: {
      tags: ['Announcements'],
      description: 'Show custom message on screen',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.announcements.showCustomMessage(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
