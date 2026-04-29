import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function textsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Texts'],
      description: 'Get all texts',
      querystring: z.object({
        fields: z.string().optional()
      })
    }
  }, async (request, reply) => {
    const { fields } = request.query;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.texts.getTexts(fields, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/:id', {
    schema: {
      tags: ['Texts'],
      description: 'Get text by ID',
      params: z.object({
        id: z.string()
      }),
      querystring: z.object({
        fields: z.string().optional()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { fields } = request.query;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.texts.getText(id, fields, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/search', {
    schema: {
      tags: ['Texts'],
      description: 'Search texts',
      body: z.object({
        text: z.string(),
        fields: z.string().optional()
      })
    }
  }, async (request, reply) => {
    const { text, fields } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.texts.searchText(text, fields, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/show', {
    schema: {
      tags: ['Texts'],
      description: 'Show text on screen',
      body: z.object({
        id: z.string(),
        initial_index: z.number().int().optional()
      })
    }
  }, async (request, reply) => {
    const { id, initial_index } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.texts.showText(id, initial_index, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/show-verse', {
    schema: {
      tags: ['Texts'],
      description: 'Show bible verse on screen',
      body: z.object({
        book: z.number().int(),
        chapter: z.number().int(),
        verse: z.number().int()
      })
    }
  }, async (request, reply) => {
    const { book, chapter, verse } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.texts.showVerse(book, chapter, verse, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/select-verse', {
    schema: {
      tags: ['Texts'],
      description: 'Select bible verse in interface',
      body: z.object({
        book: z.number().int(),
        chapter: z.number().int(),
        verse: z.number().int()
      })
    }
  }, async (request, reply) => {
    const { book, chapter, verse } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.texts.selectVerse(book, chapter, verse, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
