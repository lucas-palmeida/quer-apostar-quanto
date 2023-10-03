import { Request, Response } from "express";
import { CreateBetInput } from "../protocols";
import httpStatus from "http-status";
import betsService from "../services/bets-service";

export async function createBet(req: Request, res: Response) {
    const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body as CreateBetInput;

    try {
        const bet = await betsService.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);
        return res.status(httpStatus.CREATED).send(bet);
    } catch (error) {
        if(error.name === "ParticipantNotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if(error.name === "InsufficientFundsError") {
            return res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
        if(error.name === "GameNotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if(error.name === "GamesAlreadyFinishedError") {
            return res.status(httpStatus.CONFLICT).send(error.message);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}