import { z } from 'zod';

export const userSchema = z.object({
  fullname: z.string(),
  email: z.string(),
  password: z.string()
    .optional(),
  confirmPassword: z.string()
    .optional(),
  address: z.string(),
});

export const userIdSchema = z.object({
  id: z.string().uuid(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})