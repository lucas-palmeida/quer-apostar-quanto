import express, { Request, Response } from "express";
import cors from "cors";
import { betsRouter, gamesRouter, participantsRouter } from './routers/index';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/health", (req: Request, res: Response) => res.send("I'm fine!"))
    .use("/participants", participantsRouter)
    .use("/games", gamesRouter)
    .use("/bets", betsRouter);

export default app;