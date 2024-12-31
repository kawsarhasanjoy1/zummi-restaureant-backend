import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../middleWare/AppError";
import UserModel from "../user/model";
import { TLoginUser } from "./interface";
import bcrypt from "bcrypt";
import config from "../../../config/config";

const loginServices = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError("User dose not exist", 404);
  }

  const hashPassword = user?.password;
  const match = await bcrypt.compare(password, hashPassword);
  if (!match) {
    throw new AppError("Password did not match", 403);
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
 loginServices
}