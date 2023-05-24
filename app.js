const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const { port } = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/:postId/comments", commentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});