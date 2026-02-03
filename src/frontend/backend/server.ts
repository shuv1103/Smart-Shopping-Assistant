import dotenv from "dotenv";
import { app } from "./app";
import connectDB from "./db";

dotenv.config({
    path: ".env"
});

const port = process.env.PORT ? Number(process.env.PORT) : 8000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Database connection failed", err);
    });
