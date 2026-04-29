import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function actionsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post('/api', {
    schema: {
      tags: ['Actions & Triggers'],
      description: 'Perform API action',
      body: z.object({
        api_id: z.string(),
        action: z.string()
      }).passthrough()
    }
  }, async (request, reply) => {
    const { api_id, action, ...params } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.actions.apiAction(api_id, action, params, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/script', {
    schema: {
      tags: ['Actions & Triggers'],
      description: 'Perform script action',
      body: z.object({
        script_id: z.string(),
        action: z.string()
      }).passthrough()
    }
  }, async (request, reply) => {
    const { script_id, action, ...params } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.actions.scriptAction(script_id, action, params, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/api-request', {
    schema: {
      tags: ['Actions & Triggers'],
      description: 'Perform API request',
      body: z.object({
        api_id: z.string(),
        action: z.string()
      }).passthrough()
    }
  }, async (request, reply) => {
    const { api_id, action, ...params } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.actions.apiRequest(api_id, action, params, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/run', {
    schema: {
      tags: ['Actions & Triggers'],
      description: 'Run multiple actions',
      body: z.object({
        actions: z.array(z.any())
      })
    }
  }, async (request, reply) => {
    const { actions } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.actions.runActions(actions, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/triggers', {
    schema: {
      tags: ['Actions & Triggers'],
      description: 'Get all triggers',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.actions.getTriggers(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/triggers/tags', {
    schema: {
      tags: ['Actions & Triggers'],
      description: 'Get trigger tags',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.actions.getTriggerTags(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/execute-file', {
    schema: {
      tags: ['Actions & Triggers'],
      description: 'Execute file on host',
      body: z.object({
        path: z.string()
      })
    }
  }, async (request, reply) => {
    const { path } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.actions.executeFile(path, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
