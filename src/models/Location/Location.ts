import mongoose, { Schema, Document } from "mongoose";

const locationSchema = new Schema({
  name: { type: String, required: true, maxlength: 200 },
  description: { type: String, maxlength: 5000 },
  type: {
    type: String,
    required: true,
    enum: ["gasstation", "business", "other"],
  },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: Number },
    long: { type: Number },
  },
});

export type LocationType = "gasstation" | "business" | "other";

export interface LocationCoordinates {
  lat: number;
  long: number;
}

export interface ILocation extends Document {
  name: string;
  description: string;
  type: LocationType;
  coordinates: LocationCoordinates;
}

export default mongoose.model<ILocation>("Location", locationSchema);
