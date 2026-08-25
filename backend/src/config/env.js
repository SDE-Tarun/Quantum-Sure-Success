const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 3000,

  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  mongoUri: process.env.MONGODB_URI,

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
};

if (!env.mongoUri) {
  throw new Error("MONGODB_URI is not configured");
}

if (!env.jwt.accessSecret) {
  throw new Error("JWT_ACCESS_SECRET is not configured");
}

if (!env.jwt.refreshSecret) {
  throw new Error("JWT_REFRESH_SECRET is not configured");
}

module.exports = env;