import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Tenant = z.infer<typeof tenantSchema>;
export const tenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  apiKey: z.string(),
  usageRequests: z.number(),
  usageTraffic: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).openapi("Tenant");

export type TenantStats = z.infer<typeof tenantStatsSchema>;
export const tenantStatsSchema = z.object({
  usageRequests: z.number().openapi({ example: 12 }),
  usageTraffic: z.number().openapi({ example: 20465 }),
}).openapi("Tenant statistics");