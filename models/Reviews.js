const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    max: 5,
    min: 1,
  },
  comment: String,
  drink: {
    type: Schema.Types.ObjectId,
    ref: "Drink",
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
