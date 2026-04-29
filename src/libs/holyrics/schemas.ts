import { z } from 'zod';

/**
 * Holyrics API Enums
 */

export const ItemTypeSchema = z.enum([
  'title',
  'song',
  'verse',
  'text',
  'audio',
  'video',
  'image',
  'file',
  'announcement',
  'automatic_presentation',
  'countdown',
  'countdown_cp',
  'cp_text',
  'plain_text',
  'uri',
  'actions',
  'global_action',
  'alert',
  'cp_alert',
  'theme_background',
  'api',
  'script',
  'module_action',
]);

export type ItemType = z.infer<typeof ItemTypeSchema>;

export const BackgroundTypeSchema = z.enum([
  'color',
  'my_video',
  'my_image',
  'video',
  'image',
  'pattern',
  'transparent',
  'image_file',
  'video_file',
  'theme',
]);

export type BackgroundType = z.infer<typeof BackgroundTypeSchema>;

export const ScheduleTypeSchema = z.enum(['temporary', 'service', 'event']);
export type ScheduleType = z.infer<typeof ScheduleTypeSchema>;

export const WeekDaySchema = z.enum(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
export type WeekDay = z.infer<typeof WeekDaySchema>;

export const WeekOfMonthSchema = z.enum(['all', 'first', 'second', 'third', 'fourth', 'last']);
export type WeekOfMonth = z.infer<typeof WeekOfMonthSchema>;

/**
 * Base Schemas
 */

export const MidiSchema = z.object({
  code: z.number(),
  velocity: z.number(),
});

export type Midi = z.infer<typeof MidiSchema>;

export const RectangleSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

export type Rectangle = z.infer<typeof RectangleSchema>;

/**
 * Core Entities
 */

export const BackgroundSchema = z.object({
  id: z.string(),
  type: BackgroundTypeSchema,
  name: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  duration: z.number().optional(),
  tags: z.array(z.string()).optional(),
  bpm: z.number().optional(),
  midi: MidiSchema.optional(),
});

export type Background = z.infer<typeof BackgroundSchema>;

export const ThemeSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
  background: z.object({
    type: BackgroundTypeSchema,
    id: z.string().or(z.number()),
    opacity: z.number().optional(),
    adjust_type: z.string().optional(),
    velocity: z.number().optional(),
  }).optional(),
  font: z.object({
    name: z.string().nullable(),
    bold: z.boolean().nullable(),
    italic: z.boolean().nullable(),
    size: z.number().nullable(),
    color: z.string().nullable(),
    line_spacing: z.number().optional(),
    char_spacing: z.number().optional(),
  }).optional(),
  // Add other properties as needed from the docs
  metadata: z.object({
    modified_time_millis: z.number(),
  }).optional(),
});

export type Theme = z.infer<typeof ThemeSchema>;

export const LyricSlideSchema = z.object({
  text: z.string(),
  styled_text: z.string().optional(),
  slide_description: z.string().optional(),
  background_id: z.string().nullable().optional(),
  transition_settings_id: z.string().nullable().optional(),
  translations: z.record(z.string(), z.string()).nullable().optional(),
});

export type LyricSlide = z.infer<typeof LyricSlideSchema>;

export const LyricsSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string().optional(),
  author: z.string().optional(),
  note: z.string().optional(),
  copyright: z.string().optional(),
  language: z.string().optional(),
  slides: z.array(LyricSlideSchema).optional(),
  formatting_type: z.enum(['basic', 'styled', 'advanced']).optional(),
  order: z.string().optional(),
  key: z.string().optional(),
  bpm: z.number().optional(),
  time_sig: z.string().optional(),
  archived: z.boolean().optional(),
  extras: z.record(z.string(), z.any()).optional(),
});

export type Lyrics = z.infer<typeof LyricsSchema>;

export const ItemSchema = z.object({
  id: z.string(),
  type: ItemTypeSchema,
  name: z.string(),
});

export type Item = z.infer<typeof ItemSchema>;

export const MemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  disabled: z.boolean().optional(),
  skills: z.string().optional(),
  metadata: z.object({
    modified_time_millis: z.number(),
  }).optional(),
});

export type Member = z.infer<typeof MemberSchema>;

export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  disabled: z.boolean().optional(),
  team: z.object({
    id: z.string(),
    name: z.string(),
  }).optional(),
  metadata: z.object({
    modified_time_millis: z.number(),
  }).optional(),
});

export type Role = z.infer<typeof RoleSchema>;

export const ScheduleSchema = z.object({
  type: ScheduleTypeSchema,
  name: z.string().optional(),
  datetime: z.string().optional(),
  lyrics_playlist: z.array(LyricsSchema).optional(),
  media_playlist: z.array(ItemSchema).optional(),
  responsible: MemberSchema.nullable().optional(),
  notes: z.string().optional(),
  metadata: z.object({
    modified_time_millis: z.number(),
  }).optional(),
});

export type Schedule = z.infer<typeof ScheduleSchema>;

export const AnnouncementSchema = z.object({
  id: z.string(),
  name: z.string(),
  text: z.string(),
  shuffle: z.boolean().optional(),
  archived: z.boolean().optional(),
});

export type Announcement = z.infer<typeof AnnouncementSchema>;

export const PPTInfoSchema = z.object({
  file_name: z.string(),
  file_fullname: z.string(),
  file_relative_path: z.string(),
  file_path: z.string(),
  is_dir: z.boolean(),
  extension: z.string(),
  properties: z.record(z.string(), z.any()).optional(),
});

export type PPTInfo = z.infer<typeof PPTInfoSchema>;

export const CountdownInfoSchema = z.object({
  time: z.string(),
  exact_time: z.boolean(),
  text_before: z.string(),
  text_after: z.string(),
  zero_fill: z.boolean(),
  countdown_relative_size: z.number(),
  hide_zero_minute: z.boolean(),
});

export type CountdownInfo = z.infer<typeof CountdownInfoSchema>;

export const PresentationModifierInfoSchema = z.object({
  type: z.enum(['WALLPAPER', 'BLANK_SCREEN', 'BLACK_SCREEN']),
  name: z.string(),
  shortcut: z.enum(['F8', 'F9', 'F10']),
  presentation_type: z.enum(['SONG', 'TEXT', 'VERSE', 'ANY_ITEM']),
  state: z.boolean(),
});

export type PresentationModifierInfo = z.infer<typeof PresentationModifierInfoSchema>;

export const NewChatMessageInfoSchema = z.object({
  id: z.string(),
  datetime: z.number(),
  user_id: z.string(),
  name: z.string(),
  message: z.string(),
});

export type NewChatMessageInfo = z.infer<typeof NewChatMessageInfoSchema>;

export const VersePresentationChangedInfoSchema = z.object({
  id: z.string(),
  book: z.number(),
  chapter: z.number(),
  verse: z.number(),
  reference: z.string(),
});

export type VersePresentationChangedInfo = z.infer<typeof VersePresentationChangedInfoSchema>;

export const PlayerProgressInfoSchema = z.object({
  time: z.number(),
  total: z.number(),
});

export type PlayerProgressInfo = z.infer<typeof PlayerProgressInfoSchema>;

/**
 * API Response Wrapper
 */

export function createApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.discriminatedUnion('status', [
    z.object({
      status: z.literal('ok'),
      data: dataSchema,
    }),
    z.object({
      status: z.literal('error'),
      error: z.union([
        z.string(),
        z.object({
          code: z.number(),
          key: z.string(),
          message: z.string(),
        }),
      ]),
    }),
  ]);
}

export const GenericResponseSchema = createApiResponseSchema(z.any());

/**
 * Common API Response Schemas
 */

export const GetLyricsResponseSchema = createApiResponseSchema(LyricsSchema);
export const GetSongsResponseSchema = createApiResponseSchema(z.array(LyricsSchema));
export const SearchLyricsResponseSchema = createApiResponseSchema(z.array(LyricsSchema));
export const GetScheduleResponseSchema = createApiResponseSchema(ScheduleSchema);
export const GetMediaPlaylistResponseSchema = createApiResponseSchema(z.array(ItemSchema));
export const GetLyricsPlaylistResponseSchema = createApiResponseSchema(z.array(LyricsSchema));
export const GetThemeResponseSchema = createApiResponseSchema(ThemeSchema);
export const GetBackgroundResponseSchema = createApiResponseSchema(BackgroundSchema);
