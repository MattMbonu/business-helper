import mongoose, { Schema, Document } from "mongoose";

const interestedContact = new Schema({
  name: { type: String, required: true, maxlength: 250 },
  approxAge: { type: Number, min: 0, max: 110 },
  description: { type: String, maxlength: 7000 },
  additionalInfo: { type: String, maxlength: 7000 },
});

export interface IInterestedContact extends Document {
  name: string;
  approxAge: number;
  description: string;
  additionalInfo: string;
}

export default mongoose.model<IInterestedContact>(
  "InterestedContact",
  interestedContact
);
