import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { holyrics } from '../libs/holyrics/index.js';

export default async function settingsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.get('/wallpaper', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Get wallpaper settings',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.getWallpaperSettings(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/wallpaper', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Set wallpaper settings',
      body: z.any()
    }
  }, async (request, reply) => {
    const settings = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.setWallpaperSettings(settings, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/display', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Get display settings',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.getDisplaySettings(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/display', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Set display settings',
      body: z.any()
    }
  }, async (request, reply) => {
    const settings = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.setDisplaySettings(settings, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/display/presets', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Get display settings presets',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.getDisplaySettingsPresets(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/transition-effect', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Get transition effect settings',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.getTransitionEffectSettings(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/transition-effect', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Set transition effect settings',
      body: z.any()
    }
  }, async (request, reply) => {
    const settings = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.setTransitionEffectSettings(settings, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/translation/presets', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Get translation presets',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.getTranslationPresetList(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/translation/presets/:id', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Get translation preset by ID',
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.getTranslationPreset(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/translation/presets/apply', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Apply translation preset',
      body: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const { id } = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.applyTranslationPreset(id, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/footer', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Get presentation footer settings',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.getPresentationFooterSettings(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.post('/footer', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Set presentation footer settings',
      body: z.any()
    }
  }, async (request, reply) => {
    const settings = request.body;
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.setPresentationFooterSettings(settings, auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });

  app.get('/midi', {
    schema: {
      tags: ['Settings & Presets'],
      description: 'Get MIDI settings',
    }
  }, async (request, reply) => {
    const auth = request.getHolyricsAuth();
    const { data, nextAuth } = await holyrics.settings.getMidiSettings(auth);
    if (nextAuth) reply.setHolyricsCookies(nextAuth);
    return data;
  });
}
