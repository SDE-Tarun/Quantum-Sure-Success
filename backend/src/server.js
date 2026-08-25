const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/database");

const startServer = async () => {
  try {
    await connectDatabase();

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
      console.log(`API: http://localhost:${env.port}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down server...`);

      server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();