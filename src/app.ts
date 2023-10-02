import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { participantsRouter } from './routers/index';

dotenv.config();

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/health", () => console.log("I'm fine!"))
    .use("/participants", participantsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
});

export default app;