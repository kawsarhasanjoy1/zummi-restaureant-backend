import { TChef } from "../chef/interface";
import chefModel from "../chef/model";
import { TUser } from "./interface";
import UserModel from "./model";

const createChef = async (payload: TChef) => {
  const user: Partial<TUser> = {};
  const role = "chef";
  (user.password = payload?.password || "zummi123"), (user.role = role);
  (user.email = payload.email),
    (user.name = payload.name),
    (user.image = payload.image);
  const NewUser = await UserModel.create(user);
  if (Object.keys(NewUser).length > 0) {
    payload.userId = NewUser._id;
    const newChef = await chefModel.create(payload);
    return newChef;
  }
};
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
  createChef,
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
  updateRole,
};
