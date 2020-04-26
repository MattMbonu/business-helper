import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  name: { type: String, required: true, maxlength: 300 },
  email: { type: String, required: true, maxlength: 300, unique: true },
  password: { type: String, required: true, minlength: 6, maxlength: 300 },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin", "root"],
  },
});

userSchema.plugin(uniqueValidator);

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default mongoose.model<IUser>("User", userSchema);
