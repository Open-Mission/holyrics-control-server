import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function quickPresentationRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post('/show', {
    schema: {
      tags: ['Quick Presentation'],
      description: 'Show quick presentation text',
      body: z.object({
        text: z.string()
      })
    }
  }, async (request, reply) => {
    const { text } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.quickPresentation.showQuickPresentation(text, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/show-countdown', {
    schema: {
      tags: ['Quick Presentation'],
      description: 'Show countdown',
      body: z.object({
        time: z.string().describe('Time in HH:mm:ss or seconds')
      })
    }
  }, async (request, reply) => {
    const { time } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.quickPresentation.showCountdown(time, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/next', {
    schema: {
      tags: ['Quick Presentation'],
      description: 'Next slide in quick presentation',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.quickPresentation.actionNextQuickPresentation(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/previous', {
    schema: {
      tags: ['Quick Presentation'],
      description: 'Previous slide in quick presentation',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.quickPresentation.actionPreviousQuickPresentation(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/close', {
    schema: {
      tags: ['Quick Presentation'],
      description: 'Close quick presentation',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.quickPresentation.closeCurrentQuickPresentation(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/current', {
    schema: {
      tags: ['Quick Presentation'],
      description: 'Get current quick presentation info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.quickPresentation.getCurrentQuickPresentation(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
