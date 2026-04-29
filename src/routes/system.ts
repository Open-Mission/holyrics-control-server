import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function systemRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/token-info', {
    schema: {
      tags: ['System'],
      description: 'Get token info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getTokenInfo(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/check-permissions', {
    schema: {
      tags: ['System'],
      description: 'Check permissions',
      body: z.object({
        actions: z.string().describe('Comma separated actions to check')
      })
    }
  }, async (request, reply) => {
    const { actions } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.checkPermissions(actions, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/version', {
    schema: {
      tags: ['System'],
      description: 'Get Holyrics version',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getVersion(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/plan-info', {
    schema: {
      tags: ['System'],
      description: 'Get Holyrics plan info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getHolyricsPlanInfo(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/api-server-info', {
    schema: {
      tags: ['System'],
      description: 'Get API server info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getAPIServerInfo(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/runtime-environment', {
    schema: {
      tags: ['System'],
      description: 'Get runtime environment',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getRuntimeEnvironment(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/runtime-environment', {
    schema: {
      tags: ['System'],
      description: 'Set runtime environment',
      body: z.object({
        environment: z.string()
      })
    }
  }, async (request, reply) => {
    const { environment } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.setRuntimeEnvironment(environment, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/global-settings', {
    schema: {
      tags: ['System'],
      description: 'Get global settings',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getGlobalSettings(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/global-settings', {
    schema: {
      tags: ['System'],
      description: 'Set global settings',
      body: z.any()
    }
  }, async (request, reply) => {
    const settings = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.setGlobalSettings(settings, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/sync-status', {
    schema: {
      tags: ['System'],
      description: 'Get sync status',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getSyncStatus(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/apis', {
    schema: {
      tags: ['System'],
      description: 'Get configured APIs',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getApis(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/scripts', {
    schema: {
      tags: ['System'],
      description: 'Get scripts',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getScripts(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/modules', {
    schema: {
      tags: ['System'],
      description: 'Get modules',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getModules(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/interface-input', {
    schema: {
      tags: ['System'],
      description: 'Get interface input status',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getInterfaceInput(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/interface-input', {
    schema: {
      tags: ['System'],
      description: 'Set interface input status',
      body: z.any()
    }
  }, async (request, reply) => {
    const input = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.setInterfaceInput(input, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/open-draw-lots', {
    schema: {
      tags: ['System'],
      description: 'Open draw lots window',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.openDrawLots(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/styled-models', {
    schema: {
      tags: ['System'],
      description: 'Get styled models',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getStyledModels(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/styled-models/map', {
    schema: {
      tags: ['System'],
      description: 'Get styled models as map',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.system.getStyledModelsAsMap(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/connection-status', {
    schema: {
      tags: ['System'],
      description: 'Get connection status to Holyrics',
      response: {
        200: z.object({
          holyrics: z.enum(['connected', 'disconnected']),
        })
      }
    }
  }, async () => {
    const isConnected = await holyrics.system.ping();
    return { holyrics: isConnected ? 'connected' : 'disconnected' };
  });
}
