import { model, Schema } from "mongoose";
import { TUser } from "./interface";
import { USER_ROLE } from "../../constance/constance";
import config from "../../../config/config";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin],
      default: "user",
      required: true,
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this; // doc
  
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt)
  );
  next();
});

const UserModel = model<TUser>("user", userSchema);

export default UserModel;
