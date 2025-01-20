import type { Request, RequestHandler, Response } from "express";

import { scraperService } from "./scraperService";
import { TenantRepository } from "@/tenants/tenantRepository";

class ScraperController {
  private tenantRepository = new TenantRepository();

  public scrapeURL: RequestHandler = async (req: Request, res: Response) => {
    const scraperResponse = await scraperService.scrapeURL(req.url);

    if (!scraperResponse.success)
      return res.status(scraperResponse.statusCode).send(scraperResponse.message);

    this.tenantRepository.addTraffic(res.locals.tenant.id, Buffer.byteLength(scraperResponse.responseObject as string, 'utf8'))
    return res.status(scraperResponse.statusCode).send({ content: scraperResponse.responseObject });
  };
}

export const scraperController = new ScraperController();