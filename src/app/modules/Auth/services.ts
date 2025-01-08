import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../user/model";
import { TLoginUser } from "./interface";
import bcrypt from "bcrypt";
import config from "../../../config/config";
import AppError from "../../middleWare/AppError";
import { TPassword } from "../../../interface/interface";

const loginServices = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(404, "User dose not exist");
  }

  const hashPassword = user?.password;
  const match = await bcrypt.compare(password, hashPassword);
  if (!match) {
    throw new AppError(403, "Password did not match");
  }

  const userPayload = {
    id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(userPayload, config.access_token as string, {
    expiresIn: "1d",
  });

  return {
    user: userPayload,
    token,
  };
};

const changePassword = async (user: JwtPayload, Password: TPassword) => {
  const isExistsId = await UserModel.findById(user?.id);
  if (!isExistsId) {
    throw new Error(
      "User dose not exist"
    );
  }
  const role = user?.role;
  const dbRole = isExistsId?.role;
  if (role !== dbRole) {
    throw new Error("don't match role");
  }

  const isExistPassword = isExistsId?.password;
  const passwordCompare = await bcrypt.compare(
    Password?.oldPassword,
    isExistPassword
  );
  if (!passwordCompare) {
    throw new Error("didn't match password");
  }

  const password = Password?.newPassword;
  if (password == Password?.oldPassword) {
    throw new Error(
      "Password change failed. Ensure the new password is unique and not among"
    );
  }
  const newHashPass = await bcrypt.hash(password, Number(10));
  const result = await UserModel.findByIdAndUpdate(
    { _id: user?.id },
    { password: newHashPass }
  );

  const data = {
    _id: user?.id,
    username: isExistsId?.name,
    email: user?.email,
    role: user?.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return data;
};

export const AuthService = {
  loginServices,
  changePassword
};
