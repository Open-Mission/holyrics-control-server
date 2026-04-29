import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function communicationPanelRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/info', {
    schema: {
      tags: ['Communication Panel'],
      description: 'Get communication panel info',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.communicationPanel.getCommunicationPanelInfo(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/settings', {
    schema: {
      tags: ['Communication Panel'],
      description: 'Set communication panel settings',
      body: z.any()
    }
  }, async (request, reply) => {
    const settings = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.communicationPanel.setCommunicationPanelSettings(settings, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/countdown/start', {
    schema: {
      tags: ['Communication Panel'],
      description: 'Start countdown in communication panel',
      body: z.object({
        time: z.string()
      })
    }
  }, async (request, reply) => {
    const { time } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.communicationPanel.startCountdownCommunicationPanel(time, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/countdown/stop', {
    schema: {
      tags: ['Communication Panel'],
      description: 'Stop countdown in communication panel',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.communicationPanel.stopCountdownCommunicationPanel(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/timer/start', {
    schema: {
      tags: ['Communication Panel'],
      description: 'Start timer in communication panel',
      body: z.object({
        time: z.string()
      })
    }
  }, async (request, reply) => {
    const { time } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.communicationPanel.startTimerCommunicationPanel(time, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/timer/stop', {
    schema: {
      tags: ['Communication Panel'],
      description: 'Stop timer in communication panel',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.communicationPanel.stopTimerCommunicationPanel(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/text', {
    schema: {
      tags: ['Communication Panel'],
      description: 'Set text in communication panel',
      body: z.object({
        text: z.string(),
        show: z.boolean()
      })
    }
  }, async (request, reply) => {
    const { text, show } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.communicationPanel.setTextCommunicationPanel(text, show, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/alert', {
    schema: {
      tags: ['Communication Panel'],
      description: 'Set alert in communication panel',
      body: z.object({
        text: z.string(),
        show: z.boolean()
      })
    }
  }, async (request, reply) => {
    const { text, show } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.communicationPanel.setAlertCommunicationPanel(text, show, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/call-attention', {
    schema: {
      tags: ['Communication Panel'],
      description: 'Call attention in communication panel',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.communicationPanel.communicationPanelCallAttention(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
