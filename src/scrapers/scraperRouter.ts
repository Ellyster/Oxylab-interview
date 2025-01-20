import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { scrapeRequestSchema, scrapeResponseSchema } from "./scraperModel";
import { scraperController } from "./scraperController";
import { authRegistry, apiKeySchema, validateApiKey } from "@/utils/security";
import { validateRequestSchema } from "@/utils/schema";

export const scraperRegistry = new OpenAPIRegistry();
export const scraperRouter: Router = express.Router();

scraperRegistry.registerPath({
  method: "post",
  path: "/scrape",
  tags: ["Scrapers"],
  summary: "Scrape an URL",
  security: [{ [(authRegistry as any).name]: [] }],
  request: {
    headers: [apiKeySchema],
    body: { 
      content: {
        'application/json': {
          schema: scrapeRequestSchema,
        }
      }
    }
  },
  responses: {
    200: {
      description: "OK",
      content: {
        'application/json': {
          schema: scrapeResponseSchema,
        }
      }
    },
    400: {
      description: "Bad request"
    },
    401: {
      description: "Unauthorized"
    },
    500: {
      description: "Internal Server Error",
    }
  }
});

scraperRouter.post("/", [validateApiKey(), validateRequestSchema(scrapeRequestSchema)], scraperController.scrapeURL);