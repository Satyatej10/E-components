const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const componentRoutes = require("./routes/componentRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors(
  origin="http://localhost:5000"
));
app.use(express.json());
// Routes
app.use("/api/components", componentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
