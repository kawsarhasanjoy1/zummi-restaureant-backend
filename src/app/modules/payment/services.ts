import { ObjectId } from "mongodb";
import config from "../../../config/config";
import { paymentModel } from "./model";
import { TOrder } from "../order/interface";
import QueryBuilder from "../../Builder/QueryBuilder";

const tran_id = new ObjectId().toString();

const createPayment = async (payload: TOrder) => {
  const data = {
    total_amount: payload.price,
    currency: "BDT",
    tran_id: tran_id, // unique tran_id
    success_url: `${config.base_url}/payment/success/${tran_id}`,
    fail_url: `${config.base_url}/payment/fail/${tran_id}`,
    cancel_url: `${config.base_url}/payment/cancel/${tran_id}`,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: payload.name,
    cus_email: payload.email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: payload.number,
    cus_fax: "01711111111",
    ship_name: payload.name,
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  return data;
};

const getPayments = async (query: Record<string, any>) => {
  const searchTerm = ["name", "category"];
  const searchQuery = new QueryBuilder(paymentModel.find(), query)
    .search(searchTerm)
    .filter()
    .sort()
    .pagination();
  const meta = await searchQuery.countTotal();
  const result = await searchQuery.QueryModel.populate("productId").populate(
    "userId"
  );
  return { result, meta };
};
const getUserPayments = async ({id, query}: any) => {
  const searchTerm = ['name' , 'number', 'category']
  const searchQuery = new QueryBuilder(paymentModel.find({ userId: id }), query).search(searchTerm).filter().pagination().sort();
  const result = await searchQuery.QueryModel.populate("userId").populate(
    "products.productId"
  );
  const meta = await searchQuery.countTotal();

  return {
    result,
    meta,
  };
};

export const paymentServices = {
  createPayment,
  getPayments,
  getUserPayments,
};
