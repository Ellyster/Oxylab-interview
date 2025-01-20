import { StatusCodes } from "http-status-codes";

import { ServiceResponse } from "@/utils/reponses";
import { logger } from "@/server";

export class ScraperService {
  // Mock the request the scraping of a URL
  async scrapeURL(url: string): Promise<ServiceResponse<string | null>> {
    if(Math.random() < 0.01)
    {
      const errorMessage = "Failed to scrape";
      logger.error(errorMessage);
      return ServiceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR); // The failure cause is unknown
    }

    const waitTime = Math.floor(Math.random() * (10 - 2 + 1) + 2) * 1000 // Between 2 and 10 seconds
    await new Promise(f => setTimeout(f, waitTime));

    return ServiceResponse.success<string>("Successfully scraped", "<html><body><h1>Scraped HTML</h1></body></html>");
  }
}

export const scraperService = new ScraperService();