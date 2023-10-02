import { Router } from "express";
import { validateBody } from "../middlewares";
import { createGameSchema, finishGameSchema } from "../schemas";
import { createGame, finishGame, getGameById, getGames } from "../controllers/games-controller";

const gamesRouter = Router();

gamesRouter
    .post("/", validateBody(createGameSchema), createGame)
    .post("/:gameId/finish", validateBody(finishGameSchema), finishGame)
    .get("/", getGames)
    .get("/:gameId", getGameById);

export { gamesRouter };