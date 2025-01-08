import QueryBuilder from "../../Builder/QueryBuilder";
import { TChef } from "./interface";
import chefModel from "./model";

const getChefs = async (query: Record<string, any>) => {
  const searchTerm = ["name", "title"];
  const searchQuery = new QueryBuilder(chefModel.find(), query)
    .search(searchTerm)
    .filter()
    .sort()
    .pagination();
  const countTotal = await searchQuery.countTotal();
  const result = await searchQuery.QueryModel.populate("userId");
  return {
    countTotal,
    result,
  };
};
const getChef = async (id: string) => {
  const result = await chefModel.findById(id);
  return result;
};
const deleteChef = async (id: string) => {
  const result = await chefModel.findByIdAndDelete(id);
  return result;
};
const upChef = async (id: string, payload: Partial<TChef>) => {
  const result = await chefModel.findByIdAndUpdate(id, {});
  return result;
};

export const chefServices = {
  getChefs,
  getChef,
  deleteChef,
  upChef,
};
