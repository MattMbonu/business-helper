import mongoose, { Schema, Document } from "mongoose";

const territorySchema = new Schema({
  name: { type: String, required: true, maxlength: 300 },
  description: { type: String, maxlength: 3000 },
  assignee: { type: String, maxlength: 200 },
  addresses: [{ type: Schema.Types.ObjectId, ref: "Location", required: true }],
});

export interface ITerritory extends Document {
  name: string;
  description: string;
  assignee: string;
  addresses: Array<any>;
}

export default mongoose.model<ITerritory>("Territory", territorySchema);
