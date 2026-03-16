import "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import { connectRedis } from "./redis/redisClient.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

const startServer = async () => {
  try {
    // ✅ Check PostgreSQL connection
    await connectDB.query("SELECT 1");
    console.log("✅ PostgreSQL connected");

    // ✅ Connect Redis
    await connectRedis();
    console.log("✅ Redis connected");

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();












// import dotenv from "dotenv";
// import { app } from "./app.js";
// import { connectDB } from "./db/index.js";

// dotenv.config({
//     path: ".env"
// });

// const port = process.env.PORT ? Number(process.env.PORT) : 8000;

// connectDB.connect()
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Server is running at port ${port}`);
//         });
//     })
//     .catch((err) => {
//         console.log("Database connection failed", err);
//     });
