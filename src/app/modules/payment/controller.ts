import { Request, Response, Router } from "express";
import catchAsync from "../../../shared/utils/catchAsync";
import { paymentServices } from "./services";
import config from "../../../config/config";
import { orderModel } from "../order/model";
import ProductModel from "../product/model";
import AppError from "../../middleWare/AppError";
import sendResponse from "../../../shared/utils/sendResponse";
import { paymentModel } from "./model";
const SSLCommerzPayment = require("sslcommerz-lts");

const store_id = config.store_id;
const store_passwd = config.store_pass;
const is_live = false;

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const payment = req.body;
  const result = await paymentServices.createPayment(payment);

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz
    .init(result)
    .then((apiResponse: { GatewayPageURL: string }) => {
      const GatewayPageURL = apiResponse.GatewayPageURL;
      const tran_id = result.tran_id;
      orderModel.create({
        ...payment,
        transactionId: tran_id,
      });

      res.status(200).json({ url: GatewayPageURL });
    })
    .catch((error: any) => {
      res.status(500).json({ message: "Payment initialization failed", error });
    });
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.tranId;

  const findOrder = (await orderModel.findOne({
    transactionId: transactionId,
  })) as any;
  const productId = await Promise.all(
    findOrder?.products.map(async (product: any) => {
      const result = await ProductModel.findByIdAndUpdate(product?.productId, {
        $inc: { stock: -product?.quantity },
      });

      res.redirect(
        `https://zummi-restaureant.vercel.app/success/${findOrder?.transactionId}`
      );
      return result;
    })
  );
  const updatedOrder = await orderModel.findOneAndUpdate(
    { transactionId: transactionId },
    { status: true },
    { new: true, runValidators: true }
  );

  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found" });
  }
  const payment = {
    orderId: findOrder?._id,
    userId: findOrder?.userId,
    transactionId: findOrder?.transactionId,
    quantity: findOrder?.quantity,
    price: findOrder?.price,
    name: findOrder?.name,
    number: findOrder?.number,
    district: findOrder?.district,
    subdistrict: findOrder?.subdistrict,
  };

  const paymentResult = await paymentModel.create(payment);
  if (!productId.length || !paymentResult) {
    throw new AppError(404, "Dose not update product");
  }

  res.status(200).json({
    success: true,
    message: "Payment successful",
    order: updatedOrder,
  });
});

// Handle Payment Fail
const failedPayment = catchAsync(async (req: Request, res: Response) => {
  const transactionId = req.params.tranId;
  const updatedOrder = await orderModel.findOneAndUpdate(
    { transactionId },
    { status: false },
    { new: true, runValidators: true }
  );

  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found" });
  }

  console.log("Payment Failed:", updatedOrder);

  res.status(200).json({
    success: false,
    message: "Payment failed",
    order: updatedOrder,
  });
});

const getPayments = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await paymentServices.getPayments(query);
  sendResponse(res, {
    statusCode: 200,
    message: "payment faced successful",
    data: result,
  });
});
const getUserPayments = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.userId;
  const query = req?.query;
  const result = await paymentServices.getUserPayments({ id, query });
  sendResponse(res, {
    statusCode: 200,
    message: "payment faced successful",
    data: result,
  });
});

export const paymentController = {
  createPayment,
  updateStatus,
  failedPayment,
  getPayments,
  getUserPayments,
};
