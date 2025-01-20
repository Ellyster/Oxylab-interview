import type { Request, RequestHandler, Response } from "express";

import { type TenantStats } from "./tenantModel";

class TenantController {
  public getStatistics: RequestHandler = async (_req: Request, res: Response) => {
    return res.status(200).send({
      usageRequests: res.locals.tenant.usageRequests,
      usageTraffic: res.locals.tenant.usageTraffic
    } as TenantStats);
  };
}

export const tenantController = new TenantController();