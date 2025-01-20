import express, { type Router, type Request, type Response } from "express";
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import swaggerUi from "swagger-ui-express";

import { scraperRegistry } from "@/scrapers/scraperRouter";
import { tenantRegistry } from "@/tenants/tenantRouter";
import { authRegistry } from "./security"

function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([authRegistry, scraperRegistry, tenantRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "0.1.0",
      title: "Oxylab's interview API Gateway - Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    }
  }); 
}

export const openAPIRouter: Router = express.Router();
const openAPIDocument = generateOpenAPIDocument();

openAPIRouter.get("/swagger.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openAPIDocument);
});

openAPIRouter.use("/swagger", swaggerUi.serve, swaggerUi.setup(openAPIDocument));