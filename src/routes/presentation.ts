import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function presentationRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/current', {
    schema: {
      tags: ['Presentation'],
      description: 'Get current presentation info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.getCurrent(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/close', {
    schema: {
      tags: ['Presentation'],
      description: 'Close current presentation',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.close(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/f8', {
    schema: {
      tags: ['Presentation'],
      description: 'Get Logo (F8) status',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.getF8(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/f8', {
    schema: {
      tags: ['Presentation'],
      description: 'Set Logo (F8) status',
      body: z.object({
        show: z.boolean()
      })
    }
  }, async (request, reply) => {
    const { show } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.setF8(show, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/f8/toggle', {
    schema: {
      tags: ['Presentation'],
      description: 'Toggle Logo (F8) status',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.toggleF8(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/next', {
    schema: {
      tags: ['Presentation'],
      description: 'Go to next slide',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.next(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/previous', {
    schema: {
      tags: ['Presentation'],
      description: 'Go to previous slide',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.previous(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/go-to-index', {
    schema: {
      tags: ['Presentation'],
      description: 'Go to slide by index',
      body: z.object({
        index: z.number().int()
      })
    }
  }, async (request, reply) => {
    const { index } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.goToIndex(index, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/slide-descriptions', {
    schema: {
      tags: ['Presentation'],
      description: 'Get descriptions for all slides in current presentation',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.getSlideDescriptions(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/go-to-description', {
    schema: {
      tags: ['Presentation'],
      description: 'Go to slide by description',
      body: z.object({
        description: z.string()
      })
    }
  }, async (request, reply) => {
    const { description } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.goToSlideDescription(description, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/alert', {
    schema: {
      tags: ['Presentation'],
      description: 'Get current alert status',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.getAlert(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/alert', {
    schema: {
      tags: ['Presentation'],
      description: 'Set alert on screen',
      body: z.object({
        text: z.string(),
        show: z.boolean()
      })
    }
  }, async (request, reply) => {
    const { text, show } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.presentation.setAlert(text, show, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
