const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["customer", "administrator"],
    default: "customer",
  },
});

module.exports = mongoose.model("User", userSchema);
