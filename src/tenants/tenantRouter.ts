import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { tenantStatsSchema } from "./tenantModel";
import { tenantController } from "./tenantController";
import { authRegistry, apiKeySchema, validateApiKey } from "@/utils/security";

export const tenantRegistry = new OpenAPIRegistry();
export const tenantRouter: Router = express.Router();

tenantRegistry.registerPath({
  method: "get",
  path: "/statistics",
  tags: ["Tenant"],
  summary: "Scraping statistics of the tenant",
  security: [{ [(authRegistry as any).name]: [] }],
  request: {
      headers: [apiKeySchema],
    },
  responses: {
    200: {
      description: "OK",
      content: {
        'application/json': {
          schema: tenantStatsSchema,
        }
      }
    },
    401: {
      description: "Unauthorized"
    }
  }
});

tenantRouter.get("/", validateApiKey(), tenantController.getStatistics);