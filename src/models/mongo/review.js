import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
  content: String,
  rating: Number,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const Review = Mongoose.model("Review", reviewSchema);