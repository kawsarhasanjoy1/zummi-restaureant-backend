import { TUser } from "./interface";
import UserModel from "./model";

const createUser = async (payload: TUser) => {
  const result = await UserModel.create(payload);

  return result;
};

const getAllUser = async () => {
  const result = await UserModel.find();
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};
const deleteUser = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};
const updateUser = async (id: string, payload: any) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const updateRole = async (id: string, role: string) => {
  const result = await UserModel.findOneAndUpdate(
    { _id: id },
    { role: role },
    { new: true }
  );
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  updateRole,
};
