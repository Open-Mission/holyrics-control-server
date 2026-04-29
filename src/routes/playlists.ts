import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function playlistsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/lyrics', {
    schema: {
      tags: ['Playlists'],
      description: 'Get the current lyrics playlist'
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.playlists.getLyricsPlaylist(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/media', {
    schema: {
      tags: ['Playlists'],
      description: 'Get the current media playlist'
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.playlists.getMediaPlaylist(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/add', {
    schema: {
      tags: ['Playlists'],
      description: 'Add an item to the playlist',
      body: z.object({
        type: z.enum(['song', 'media']),
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { type, id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.playlists.addToPlaylist(type, id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/saved', {
    schema: {
      tags: ['Playlists'],
      description: 'Get all saved playlists'
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.playlists.getSavedPlaylists(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/load', {
    schema: {
      tags: ['Playlists'],
      description: 'Load a saved playlist',
      body: z.object({
        name: z.string()
      })
    }
  }, async (request, reply) => {
    const { name } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.playlists.loadSavedPlaylist(name, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
