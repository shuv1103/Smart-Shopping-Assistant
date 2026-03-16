import { Router } from "express";
import { webSearchController } from "../controllers/websearch.controller.js";

const webSearchRouter = Router();

webSearchRouter.post("/", webSearchController);

export { webSearchRouter };
