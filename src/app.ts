import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/health", (req: Request, res: Response) => {
        res.send("I'm fine!")
    });

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
});

export default app;