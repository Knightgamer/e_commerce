// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Body parser middleware
app.use(bodyParser.json());
app.use(cors());

// Define User schema and model
const userSchema = new mongoose.Schema({
  firstName: String,
  surname: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false }, // Add isAdmin field
});

const User = mongoose.model("User", userSchema);

// Admin credentials
const ADMIN_EMAIL = "rickyelvis@usiu.ac.ke";
const ADMIN_PASSWORD = "rickyelvis";

// Check if the admin user exists, create if not
async function createAdminUser() {
  const adminUser = await User.findOne({ email: ADMIN_EMAIL });

  if (!adminUser) {
    const newAdminUser = new User({
      firstName: "Ricky",
      surname: "Elvis",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      isAdmin: true,
    });

    await newAdminUser.save();
  }
}

// Call the function to create the admin user
createAdminUser();

// User registration route
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, surname, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ firstName, surname, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define your existing routes and controllers here...
app.use("/items", require("./routes/itemsRoutes"));
app.use("/order", require("./routes/orderRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
