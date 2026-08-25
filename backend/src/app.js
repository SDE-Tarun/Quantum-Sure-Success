const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const env = require("./config/env");
const notFoundHandler = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const scanRoutes = require("./routes/scan.routes");
const adminScanRoutes = require("./routes/admin.scan.routes");

const app = express();

// Security
app.use(helmet());

// Request logging
app.use(morgan("dev"));

// CORS
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// User routes
app.use("/api/v1/users", userRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/scans", scanRoutes);

app.use("/api/v1/admin/scans", adminScanRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

module.exports = app;