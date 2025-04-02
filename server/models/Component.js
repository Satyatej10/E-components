const mongoose = require("mongoose");

const ComponentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  code: { type: String, required: true }, // Stores React Component Code
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Component", ComponentSchema);
