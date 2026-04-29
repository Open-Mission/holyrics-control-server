import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function quizRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/', {
    schema: {
      tags: ['Quiz'],
      description: 'Get quiz list',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.quiz.getQuizList(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/show', {
    schema: {
      tags: ['Quiz'],
      description: 'Show quiz',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.quiz.showQuiz(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/action', {
    schema: {
      tags: ['Quiz'],
      description: 'Perform quiz action',
      body: z.object({
        action: z.string()
      }).passthrough()
    }
  }, async (request, reply) => {
    const { action, ...params } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.quiz.quizAction(action, params, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
