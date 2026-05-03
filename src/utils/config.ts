import { z } from 'zod';

const modes = ['development', 'production', 'test'] as const;

function inferMode(): (typeof modes)[number] {
  const n = process.env.NODE_ENV;
  if (n === 'development' || n === 'production' || n === 'test') return n;
  return 'development';
}

const schema = z.object({
  MODE: z.enum(modes),
  API_BASE_URL: z
    .string()
    .trim()
    .min(1)
    .transform((s: string) => s.replace(/\/+$/, ''))
    .refine((s: string) => /^https?:\/\/.+/i.test(s)),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .trim()
    .min(1)
    .transform((s: string) => s.replace(/\/+$/, ''))
    .refine((s: string) => /^https?:\/\/.+/i.test(s)),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().trim(),
});

export type AppEnv = z.infer<typeof schema>;

export const env: AppEnv = schema.parse({
  MODE: inferMode(),
  API_BASE_URL: process.env.API_BASE_URL ?? '',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? '',
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
});

export const { MODE, API_BASE_URL, NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } = env;
