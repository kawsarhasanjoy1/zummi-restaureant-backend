import { model, Schema } from "mongoose";
import { TChef } from "./interface";

const chefSchema = new Schema<TChef>({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  title: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  experience: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  password: { type: String, required: true, default: "zummi123" },
});

chefSchema.index({ email: 1, contactNumber: 1, userId: 1 });

const chefModel = model<TChef>("chef", chefSchema);

export default chefModel;
