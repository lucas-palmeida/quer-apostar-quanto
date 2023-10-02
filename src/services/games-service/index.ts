import { gamesAlreadyFinishedError } from "../../errors/games-already-finished-error";
import { notFoundError } from "../../errors/not-found-error";
import gamesRepository from "../../repositories/games-repository";

async function createGame(homeTeamName: string, awayTeamName: string) {
    const game = await gamesRepository.createGame(homeTeamName, awayTeamName);
    return game;
}

async function finishGame(gameId: number, homeTeamScore: number, awayTeamScore: number) {
    const gameExists = await getGameById(gameId);
    if(!gameExists) throw notFoundError();
    if(gameExists.isFinished) throw gamesAlreadyFinishedError();

    const finishedGame = await gamesRepository.finishGame(gameId, homeTeamScore, awayTeamScore);
    return finishedGame;
}

async function getGames() {
    const games = await gamesRepository.getGames();
    return games;
}

async function getGameById(gameId: number) {
    const game = await gamesRepository.getGameById(gameId);
    if(!game) throw notFoundError();

    return game;
}

export default {
    createGame,
    finishGame,
    getGames,
    getGameById,
}