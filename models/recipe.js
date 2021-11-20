const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  creator: String,
  name: String,
  img: {
    type: String,
    default:
      "https://ms1.ostium.cz/instance/web-recepty/jV8PrSK7/h389w574t.jpg",
  },
  category: String,
  level: { type: String, required: true },
  cookTime: { type: String, required: true },
  tutorial: { type: Array, required: true },
  ingrediencies: { type: Array, required: true },
  desc: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
});
module.exports = mongoose.model("Recipe", recipeSchema);
