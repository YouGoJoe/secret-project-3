const mongoose = require("mongoose");

const DrinksSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  type: {
    type: String,
    enum: ["coffee", "tea", "beer", "wine"],
  },
  tags: [{ type: String }],
});

module.exports = mongoose.model("Drink", DrinksSchema);
