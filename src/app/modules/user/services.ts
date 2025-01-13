import jwt from "jsonwebtoken";
import QueryBuilder from "../../Builder/QueryBuilder";
import AppError from "../../middleWare/AppError";
import { TChef } from "../chef/interface";
import chefModel from "../chef/model";
import { TUser } from "./interface";
import UserModel from "./model";
import config from "../../../config/config";

const createChef = async (payload: TChef) => {
  const session = await UserModel.startSession();
  session.startTransaction();

  try {
    const user: Partial<TUser> = {};
    const role = "chef";
    user.password = payload?.password || "zummi123";
    user.role = role;
    user.email = payload.email;
    user.name = payload.name;
    user.image = payload.image;

    const NewUser = await UserModel.create([user], { session });

    if (NewUser.length > 0) {
      payload.userId = NewUser[0]._id;

      // সেফ ক্রিয়েট করা
      const newChef = await chefModel.create([payload], { session });

      await session.commitTransaction();
      session.endSession();

      return newChef;
    } else {
      throw new Error("User creation failed");
    }
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    throw new Error(`Transaction failed: ${error.message}`);
  }
};

const createUser = async (payload: TUser) => {
  const result = await UserModel.create(payload);

  return result;
};

const getAllUser = async (query: any) => {
  const searchTerm = ["name", "email", "role"];
  const userQuery = new QueryBuilder(UserModel.find(), query)
    .search(searchTerm)
    .filter()
    .pagination()
    .sort();
  const meta = await userQuery.countTotal();
  const result = await userQuery.QueryModel;

  return {
    result,
    meta,
  };
};
const fetchAdmin = async () => {
  const admin = "admin";
  const result = await UserModel.find({ role: admin });

  return result;
};
const fetchAllUser = async () => {
  const result = await UserModel.find();

  return result;
};
const getSingleUser = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};
const deleteUser = async (id: string) => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const chef = await chefModel.findOne({ userId: user?._id });
  if (chef) {
    await chefModel.findByIdAndDelete(chef?._id);
    await UserModel.findByIdAndDelete(user?._id);
  }
  const result = await UserModel.findByIdAndDelete(user?._id);
  return result;
};
const updateUser = async (id: string, payload: any) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const updateRole = async (id: string, role: string, currentAdmin: any) => {
  const user = await UserModel.findOne({ _id: id });
  const userId = user?._id as any;
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (userId == currentAdmin?.id) {
    throw new AppError(403, "You cannot update your own role");
  }

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
  fetchAllUser,
  fetchAdmin,
};
