import { z } from 'zod';

export const postSchema = z.object({
  author: z.string(),
  title: z.string(),
  article: z.string(),
});

export const postIdSchema = z.object({
  id: z.string().uuid(),
});