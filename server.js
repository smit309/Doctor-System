const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config({ path: "./routes/.env" });
const path = require("path");

connectDB();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.get;

const port = process.env.ROUTES_PORT || 7070;
const mode = process.env.NODE_MODE || "development";

app.listen(port, () => {
  console.log(`server is running in ${mode} mode on port ${port}`.bgCyan.white);
});
