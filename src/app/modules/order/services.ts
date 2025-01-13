import { Types } from "mongoose";
import QueryBuilder from "../../Builder/QueryBuilder";
import BlogModel from "../blog/model";
import chefModel from "../chef/model";
import ProductModel from "../product/model";
import ReviewModel from "../review/model";
import UserModel from "../user/model";
import { TOrder } from "./interface";
import { orderModel } from "./model";

const getOrders = async (query: any) => {
  const searchTerm = ["name", "email"];
  const searchQuery = new QueryBuilder(orderModel.find(), query)
    .search(searchTerm)
    .filter()
    .sort()
    .pagination();
  const meta = await searchQuery.countTotal();
  const result = await searchQuery.QueryModel.populate(
    "products.productId"
  ).populate("userId");
  return {
    meta,
    result,
  };
};
const getOrder = async (id: string) => {
  const result = await orderModel.findById(id);
  return result;
};
const getUserOrder = async ({ id, query }: any) => {
  const searchTerm = ["name", "number", "category"];
  const searchQuery = new QueryBuilder(orderModel.find({ userId: id }), query)
    .search(searchTerm)
    .filter()
    .pagination()
    .sort();

  const result = await searchQuery.QueryModel.populate("userId").populate(
    "products.productId"
  );

  const meta = await searchQuery.countTotal();

  return {
    result,
    meta,
  };
};

const deleteOrder = async (id: string) => {
  const result = await orderModel.findByIdAndDelete(id);
  return result;
};
const getUserStats = async (userId: string) => {
  const orderStats = await orderModel.aggregate([
    {
      $match: { userId: new Types.ObjectId(userId) }, // Ensure proper type
    },
    { $unwind: "$products" },
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $group: {
        _id: "$productDetails.category",
        totalPrice: {
          $sum: { $multiply: ["$products.quantity", "$productDetails.price"] },
        },
        totalOrder: { $sum: "$products.quantity" },
      },
    },
  ]);

  const totalReview = await ReviewModel.countDocuments({ user: userId });

  return {
    orderDetails: orderStats,
    totalPrice: orderStats[0]?.totalPrice || 0,
    totalOrder: orderStats[0]?.totalOrder || 0,
    totalReview,
  };
};

const getChefStats = async () => {
  const orders: TOrder[] = await orderModel
    .find()
    .populate("products.productId");

  const orderDetails = await orderModel.aggregate([
    { $unwind: "$products" },
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $group: {
        _id: "$productDetails.category",
        count: { $sum: "$products.quantity" },
        totalPrice: {
          $sum: { $multiply: ["$products.quantity", "$productDetails.price"] },
        },
      },
    },
  ]);

  const totalOrder = orders.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalProduct = await ProductModel.estimatedDocumentCount();
  const totalReview = await ReviewModel.estimatedDocumentCount();
  const totalChef = await chefModel.estimatedDocumentCount();

  return {
    orderDetails,
    totalOrder,
    totalReview,
    totalProduct,
    totalChef,
  };
};

const getAdminStats = async () => {
  const orders: TOrder[] = await orderModel
    .find()
    .populate("products.productId");

  const orderDetails = await orderModel.aggregate([
    { $unwind: "$products" },
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $group: {
        _id: "$productDetails.category",
        count: { $sum: "$products.quantity" },
        totalPrice: {
          $sum: { $multiply: ["$products.quantity", "$productDetails.price"] },
        },
      },
    },
  ]);

  const totalOrder = orders.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalPrice = orders.reduce((acc, cur) => acc + cur.price, 0);
  const totalProduct = await ProductModel.estimatedDocumentCount();
  const totalUser = await UserModel.estimatedDocumentCount();
  const totalReview = await ReviewModel.estimatedDocumentCount();
  const totalBlog = await BlogModel.estimatedDocumentCount();
  const totalChef = await chefModel.estimatedDocumentCount();

  return {
    orders,
    orderDetails,
    totalOrder,
    totalUser,
    totalReview,
    totalPrice,
    totalProduct,
    totalBlog,
    totalChef,
  };
};
const deleteUserOrder = async (id: string) => {
  const result = await orderModel.findByIdAndDelete({ userId: id });
  return result;
};

export const orderServices = {
  getOrders,
  getOrder,
  deleteOrder,
  getUserOrder,
  deleteUserOrder,
  getAdminStats,
  getUserStats,
  getChefStats,
};
