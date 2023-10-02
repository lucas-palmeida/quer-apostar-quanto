import { Router } from "express";
import { validateBody } from "../middlewares";
import { betSchema } from "../schemas";
import { createBet } from "../controllers/bets-controller";

const betsRouter = Router();

betsRouter.post("/", validateBody(betSchema), createBet);

export { betsRouter };