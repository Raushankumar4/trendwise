require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const articleRoutes = require("./routes/articleRoutes");
const commentRoutes = require("./routes/commentRoutes");
const trendRoutes = require("./routes/trendRoutes");

app.use("/api/article", articleRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/trend", trendRoutes);

app.get("/", (req, res) => res.send("TrendWise Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
