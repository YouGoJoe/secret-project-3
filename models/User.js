const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
