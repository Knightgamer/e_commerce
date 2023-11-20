// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
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

// Define your existing routes and controllers here...
app.use("/users", require("./routes/userRoutes"));

app.use("/items", require("./routes/itemsRoutes"));
app.use("/order", require("./routes/orderRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
