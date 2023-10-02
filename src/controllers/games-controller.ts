import { Request, Response } from "express";
import { InputCreateGameBody, InputFinishGameBody } from "../protocols";
import httpStatus from "http-status";
import gamesService from "../services/games-service";

export async function createGame(req: Request, res: Response) {
    const { homeTeamName, awayTeamName } = req.body as InputCreateGameBody;

    try {
        const game = await gamesService.createGame(homeTeamName, awayTeamName);
        return res.status(httpStatus.CREATED).send(game);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function finishGame(req: Request, res: Response) {
    const { gameId } = req.params;
    const { homeTeamScore, awayTeamScore } = req.body as InputFinishGameBody;

    try {
        const finishedGame = await gamesService.finishGame(Number(gameId), homeTeamScore, awayTeamScore);
        return res.status(httpStatus.OK).send(finishedGame);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        if(error.name === 'GamesAlreadyFinishedError') {
            return res.status(httpStatus.CONFLICT).send(error.message);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function getGames(req: Request, res: Response) {
    try {
        const games = await gamesService.getGames();
        return res.status(httpStatus.OK).send(games);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function getGameById(req: Request, res: Response) {
    const { gameId } = req.params;

    try {
        const game = await gamesService.getGameById(Number(gameId));
        return res.status(httpStatus.OK).send(game);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}