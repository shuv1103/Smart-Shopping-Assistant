import { Router } from "express";
import { webSearchController } from "../controllers/websearch.controller";

const webSearchRouter = Router();

webSearchRouter.post("/", webSearchController);

export { webSearchRouter };
