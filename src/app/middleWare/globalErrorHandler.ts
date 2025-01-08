import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../../interface/interface";
import HandleZodError from "../errors/HandleZodError";
import HandleCastError from "../errors/HandleCastError";
import HandleMongooseError from "../errors/HandleMongooseError";
import AppError from "./AppError";

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
  } else if (error instanceof AppError) {
    // Handle custom AppError
    status = error.statusCode;
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  res.status(status).json({
    success: false,
    message,
    errorSources,
  });
};
