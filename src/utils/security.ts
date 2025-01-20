const { createHash } = require('crypto');
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { TenantRepository } from "@/tenants/tenantRepository";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type ApiKey = z.infer<typeof apiKeySchema>;
export const apiKeySchema = z.object({
  'x-api-key': z.string().openapi({ example: '3f59d304-39a4-4012-82e4-dbb486c19e4a' }),
});

export const authRegistry = new OpenAPIRegistry();

authRegistry.registerComponent('headers', 'x-api-key', {
  example: '3f59d304-39a4-4012-82e4-dbb486c19e4a',
  required: true,
  description: 'The API Key you were given in the README',
});

const tenantRepository = new TenantRepository()

export const validateApiKey = () => (req: Request, res: Response, next: NextFunction) => {
  const key = req.header("x-api-key");
  
  if(!key)
    return res.status(StatusCodes.UNAUTHORIZED).send("Missing API key");

  tenantRepository.findByApiKey(createHash('sha256').update(key).digest('hex')).then( tenant => {
    if(!tenant)
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid API key");

    res.locals.tenant = tenant;
    next();
  });
};