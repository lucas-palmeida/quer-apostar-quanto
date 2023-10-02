import { Router } from "express";
import { validateBody } from "../middlewares/index";
import { participantSchema } from "../schemas/participants-schemas";
import { createParticipant, getParticipants } from "../controllers/participants-controller";

const participantsRouter = Router();

participantsRouter
    .post("/", validateBody(participantSchema), createParticipant)
    .get("/", getParticipants);

export { participantsRouter };

