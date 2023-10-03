import { ParticipantInput } from "../protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";
import participantsService from "../services/participants-service";

export async function createParticipant(req: Request, res: Response) {
    const { name, balance } = req.body as ParticipantInput;

    try {
        const participant = await participantsService.createParticipant(name, Number(balance));
        return res.status(httpStatus.CREATED).send(participant);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function getParticipants(req: Request, res: Response) {
    try {
        const participants = await participantsService.getParticipants();
        return res.status(httpStatus.OK).send(participants);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}