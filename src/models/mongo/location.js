import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  title: String,
  description: String,
  longitude: Number,
  latitude: Number,
  distance: Number,
  difficulty: String,
  public_location: Boolean,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
});

export const Location = Mongoose.model("Location", locationSchema);