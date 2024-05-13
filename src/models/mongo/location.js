import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  title: String,
  description: String,
  longitude: Number,
  latitude: Number,
  distance: Number,
  difficulty: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Location = Mongoose.model("Location", locationSchema);