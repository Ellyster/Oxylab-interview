import cors from "cors";
import express, { type Express, type Request } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { rateLimit } from "express-rate-limit";

import { env } from "@/utils/config";
import { scraperRouter } from "@/scrapers/scraperRouter";
import { tenantRouter } from "./tenants/tenantRouter";
import { openAPIRouter } from "@/utils/swagger";

const logger = pino({ name: "server start" });
const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req: Request) => req.ip as string,
});
const server: Express = express();

// Set the application to trust the reverse proxy
server.set("trust proxy", true);

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
server.use(helmet());
server.use(rateLimiter);

// Routes
server.use("/scrape", scraperRouter);
server.use("/statistics", tenantRouter);

// Swagger UI
server.use(openAPIRouter);

export { server, logger };