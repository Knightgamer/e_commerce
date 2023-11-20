const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); // Adjust the path as needed
const bcrypt = require("bcrypt");
const saltRounds = 10; // You can adjust this based on your security requirements

// Register a new user
const register = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, firstName, lastName, email, role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Other CRUD operations (as placeholders)
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Excluding the password from the result
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  // Logic to get a single user by ID
});

const updateUser = asyncHandler(async (req, res) => {
  // Logic to update a user
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne({ _id: user._id });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
