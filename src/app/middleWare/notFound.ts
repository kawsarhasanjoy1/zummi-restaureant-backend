import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `${req.originalUrl} api not found`,
  });
};

export default notFound