import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function crudRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post('/create', {
    schema: {
      tags: ['CRUD'],
      description: 'Create a new item',
      body: z.object({
        type: z.string(),
        item: z.any()
      })
    }
  }, async (request, reply) => {
    const { type, item } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.crud.createItem(type, item, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/edit', {
    schema: {
      tags: ['CRUD'],
      description: 'Edit an existing item',
      body: z.object({
        type: z.string(),
        id: z.string(),
        item: z.any()
      })
    }
  }, async (request, reply) => {
    const { type, id, item } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.crud.editItem(type, id, item, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/delete', {
    schema: {
      tags: ['CRUD'],
      description: 'Delete an item',
      body: z.object({
        type: z.string(),
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { type, id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.crud.deleteItem(type, id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
