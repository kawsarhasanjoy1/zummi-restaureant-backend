import { NextFunction, Request, Response } from "express";

type TResponse<T> = {
  statusCode: number;
  message: string;
  data: T | T[] | null;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: true,
    message: data.message,
    data: data?.data,
  });
};

export default sendResponse;
