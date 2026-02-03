import express from "express";
import cors from "cors";
import { ApiResponse } from "./utils/ApiResponse";
import { webSearchRouter } from "./routes/websearch.routes";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN ?? "*",
        credentials: true
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/websearch", webSearchRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const statusCode = 500;
    res.status(statusCode).json(new ApiResponse(statusCode, null, err.message || "Internal Server Error"));
});

export { app };
