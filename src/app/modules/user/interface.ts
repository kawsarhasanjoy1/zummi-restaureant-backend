export interface TUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "superAdmin" | "chef";
  image: string;
}
