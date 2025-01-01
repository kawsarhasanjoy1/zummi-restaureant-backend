import { TChef } from "./interface";
import chefModel from "./model";

const getChefs = async () => {
  const result = await chefModel.find().populate("userId");
  return result;
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
