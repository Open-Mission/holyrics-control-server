import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function mediasRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/audios', {
    schema: {
      tags: ['Medias'],
      description: 'Get all audio files'
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.getAll(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/audios/:id', {
    schema: {
      tags: ['Medias'],
      description: 'Get audio by ID',
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.getById(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/audios/:id/property', {
    schema: {
      tags: ['Medias'],
      description: 'Set audio item property',
      params: z.object({
        id: z.string()
      }),
      body: z.object({
        property: z.string(),
        value: z.any()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { property, value } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.setProperty(id, property, value, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/play/audio', {
    schema: {
      tags: ['Medias'],
      description: 'Play an audio file',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.playAudio(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/play/video', {
    schema: {
      tags: ['Medias'],
      description: 'Play a video file',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.playVideo(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/show-image', {
    schema: {
      tags: ['Medias'],
      description: 'Show an image on screen',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.showImage(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/exists/:id', {
    schema: {
      tags: ['Medias'],
      description: 'Check if audio exists',
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.exists(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/duration/:id', {
    schema: {
      tags: ['Medias'],
      description: 'Get media duration',
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.getMediaDuration(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/favorites', {
    schema: {
      tags: ['Medias'],
      description: 'Get favorite items',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.getFavorites(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/favorite-action', {
    schema: {
      tags: ['Medias'],
      description: 'Perform action on favorites',
      body: z.object({
        action: z.string()
      }).passthrough()
    }
  }, async (request, reply) => {
    const { action, ...params } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.medias.favoriteAction(action, params, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
