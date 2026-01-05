import { z } from 'zod';

export const postSchema = z.object({
  author: z.string(),
  created_at: z.string(),
  title: z.string(),
  article: z.string(),
});

export const postIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});