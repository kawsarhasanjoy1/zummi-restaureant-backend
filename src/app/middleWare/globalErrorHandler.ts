import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../../interface/interface";
import HandleZodError from "../errors/HandleZodError";
import HandleCastError from "../errors/HandleCastError";
import HandleMongooseError from "../errors/HandleMongooseError";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = error?.message || "Something went wrong";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (error instanceof ZodError) {
    const simplified = HandleZodError(error);
    (status = simplified.statusCode),
      (message = simplified?.message),
      (errorSources = simplified?.errorSources);
  } else if (error?.name === "CastError") {
    const simplified = HandleCastError(error);
    (status = simplified.statusCode),
      (message = simplified.message),
      (errorSources = simplified.errorSources);
  } else if (error?.name === "ValidationError") {
    const simplified = HandleMongooseError(error);
    (status = simplified.statusCode),
      (message = simplified.message),
      (errorSources = simplified.errorSources);
  }
  res.status(status).json({
    success: false,
    message,
    errorSources,
  });
};
