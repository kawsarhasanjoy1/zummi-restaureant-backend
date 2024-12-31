import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../user/model";
import { TLoginUser } from "./interface";
import bcrypt from "bcrypt";
import config from "../../../config/config";
import AppError from "../../middleWare/AppError";

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
    expiresIn: "1h",
  });

  return {
    user: userPayload,
    token,
  };
};

export const AuthService = {
  loginServices,
};
