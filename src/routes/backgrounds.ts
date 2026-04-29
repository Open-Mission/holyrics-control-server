import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function backgroundsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/current', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Get current background info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.getCurrentBackground(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/current-theme', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Get current theme info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.getCurrentTheme(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/themes', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Get all themes',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.getThemes(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Get all backgrounds',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.getBackgrounds(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/tags', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Get background tags',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.getBackgroundTags(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/set', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Set current background',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.setCurrentBackground(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/thumbnail', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Get thumbnail for item',
      querystring: z.object({
        id: z.string(),
        type: z.string()
      })
    }
  }, async (request, reply) => {
    const { id, type } = request.query;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.getThumbnail(id, type, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/color-map', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Get color map',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.getColorMap(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/set-logo', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Set logo background',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.setLogo(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/bpm', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Get current BPM',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.getBpm(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/bpm', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Set current BPM',
      body: z.object({
        bpm: z.number()
      })
    }
  }, async (request, reply) => {
    const { bpm } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.setBpm(bpm, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/hue', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Get current Hue',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.getHue(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/hue', {
    schema: {
      tags: ['Backgrounds & Themes'],
      description: 'Set current Hue',
      body: z.object({
        hue: z.number()
      })
    }
  }, async (request, reply) => {
    const { hue } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.backgrounds.setHue(hue, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
