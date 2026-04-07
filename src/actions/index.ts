// src/actions/index.ts
import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';

export const server = {
  sendMail: defineAction({
    accept: 'json',
    input: z.object({
      subject: z.string(),
      message: z.string(),
    }),
    handler: async (input) => {
      // Logic: Save to DB, send email, etc.
      return { success: true, subject: input.subject, message: input.message };
    },
  }),
};