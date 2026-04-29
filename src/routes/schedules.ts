import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function schedulesRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/current', {
    schema: {
      tags: ['Schedules'],
      description: 'Get current schedule',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.schedules.getCurrentSchedule(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/', {
    schema: {
      tags: ['Schedules'],
      description: 'Get all schedules',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.schedules.getSchedules(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/set', {
    schema: {
      tags: ['Schedules'],
      description: 'Set current schedule',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.schedules.setCurrentSchedule(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/history/:id', {
    schema: {
      tags: ['Schedules'],
      description: 'Get history by ID',
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.schedules.getHistory(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/histories', {
    schema: {
      tags: ['Schedules'],
      description: 'Get all histories',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.schedules.getHistories(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/nearest-history', {
    schema: {
      tags: ['Schedules'],
      description: 'Get nearest history',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.schedules.getNearestHistory(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
