import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type ScrapeRequest = z.infer<typeof scrapeRequestSchema>;
export const scrapeRequestSchema = z.object({
  url: z.string().url({ message: "Invalid URL" }).openapi({ example: "http://www.example.com" })
}).openapi("Scrape request");

export type ScrapeResponse = z.infer<typeof scrapeResponseSchema>;
export const scrapeResponseSchema = z.object({
  content: z.string().openapi({ example: "<html><body><h1>Scraped HTML</h1></body></html>" })
}).openapi("Scrape response");