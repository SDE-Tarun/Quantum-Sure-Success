const mongoose = require("mongoose");
const env = require("./env");

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(env.mongoUri);

    console.log(
      `MongoDB connected: ${connection.connection.host}/${connection.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    process.exit(1);
  }
};

module.exports = connectDatabase;