import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function teamsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/song-groups', {
    schema: {
      tags: ['Teams & Members'],
      description: 'Get all song groups',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.teams.getSongGroups(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/song-groups/:id', {
    schema: {
      tags: ['Teams & Members'],
      description: 'Get song group by ID',
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.teams.getSongGroup(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/', {
    schema: {
      tags: ['Teams & Members'],
      description: 'Get all teams',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.teams.getTeams(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/members', {
    schema: {
      tags: ['Teams & Members'],
      description: 'Get all members',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.teams.getMembers(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/roles', {
    schema: {
      tags: ['Teams & Members'],
      description: 'Get all roles',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.teams.getRoles(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/services', {
    schema: {
      tags: ['Teams & Members'],
      description: 'Get all services',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.teams.getServices(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/events', {
    schema: {
      tags: ['Teams & Members'],
      description: 'Get all events',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.teams.getEvents(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/song-groups/add', {
    schema: {
      tags: ['Teams & Members'],
      description: 'Add songs to song group',
      body: z.object({
        groupId: z.string(),
        songIds: z.array(z.string())
      })
    }
  }, async (request, reply) => {
    const { groupId, songIds } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.teams.addSongsToSongGroup(groupId, songIds, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/song-groups/remove', {
    schema: {
      tags: ['Teams & Members'],
      description: 'Remove songs from song group',
      body: z.object({
        groupId: z.string(),
        songIds: z.array(z.string())
      })
    }
  }, async (request, reply) => {
    const { groupId, songIds } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.teams.removeSongsFromSongGroup(groupId, songIds, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
