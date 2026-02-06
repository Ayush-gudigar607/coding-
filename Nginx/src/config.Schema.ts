import { z } from 'zod';

const upstreamSchema = z.object({
  id: z.string(),
  url: z.string().url()
});

const headerSchema = z.object({
  key: z.string(),
  value: z.string()
});

const ruleSchema = z.object({
  path: z.string(),
  upstreams: z.array(z.string())
});

const serverSchema = z.object({
  listen: z.number(),
  workers: z.number(),
  upstreams: z.array(upstreamSchema),  // Changed from 'upstream' to 'upstreams'
  headers: z.array(headerSchema),
  rules: z.array(ruleSchema)
});

export const rootConfigSchema = z.object({
  server: serverSchema
});

export type ConfigSchemaType = z.infer<typeof rootConfigSchema>;