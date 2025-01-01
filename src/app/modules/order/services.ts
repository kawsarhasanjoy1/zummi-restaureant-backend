import TOrder from "./interface";
import OrderModel from "./model";

const createOrder = async (payload: TOrder) => {
  const result = await OrderModel.create(payload);
  return result;
};
const getOrders = async () => {
  const result = await OrderModel.find().populate('userId');
  return result;
};
const getOrder = async (id: string) => {
  const result = await OrderModel.findById(id);
  return result;
};

const deleteOrder = async (id: string) => {
  const result = await OrderModel.findByIdAndDelete(id);
  return result;
};

export const orderServices = {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
};
