import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z, type ZodError, type ZodSchema } from "zod";

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export const errorResponseSchema = z.string();

export const validateRequestSchema = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    console.log(err)
    return res.status(StatusCodes.BAD_REQUEST).send(`Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`);
  }
};



