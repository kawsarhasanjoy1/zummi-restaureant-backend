import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  mongoose_url: process.env.MONGOOSE_URL,
  super_admin_pass: process.env.SUPER_ADMIN_PASS,
  bcrypt: process.env.BCRYPT,
  access_token: process.env.ACCESS_TOKEN,
};
