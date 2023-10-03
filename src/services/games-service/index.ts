import { gamesAlreadyFinishedError } from "../../errors/games-already-finished-error";
import { notFoundError } from "../../errors/not-found-error";
import betsRepository from "../../repositories/bets-repository";
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
    const betsList = await betsRepository.getBets(gameId);
    let amountBetTotal: number = 0;
    let amountBetWinners: number = 0;
    for(let i = 0; i < betsList.length; i++) {
        let bet = betsList[i];
        if(bet.homeTeamScore == finishedGame.homeTeamScore && bet.awayTeamScore == finishedGame.awayTeamScore){
            amountBetWinners += bet.amountBet;
        }
        amountBetTotal += bet.amountBet;
    }

    for(let i = 0; i < betsList.length; i++) {
        let bet = betsList[i];
        if(bet.homeTeamScore === finishedGame.homeTeamScore && bet.awayTeamScore === finishedGame.awayTeamScore){
            const amountWon = (bet.amountBet / (amountBetWinners)) * (amountBetTotal) * (1 - 0.3);
            await betsRepository.updateBet(bet.id, "WON", amountWon);
        } else {
            await betsRepository.updateBet(bet.id, "LOST", 0);
        }
    }
    
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