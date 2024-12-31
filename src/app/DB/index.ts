import config from "../../config/config";
import { USER_ROLE } from "../constance/constance";
import { TUser } from "../modules/user/interface";
import UserModel from "../modules/user/model";

const superUser: TUser = {
  email: "kawsarhasanjoy342@gmail,com",
  name: 'Md Kawsar',
  password: config.super_admin_pass as string,
  role: USER_ROLE.superAdmin,
  image: "https://i.ibb.co.com/WsrL60p/20240905-143900.jpg"
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await UserModel.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;
