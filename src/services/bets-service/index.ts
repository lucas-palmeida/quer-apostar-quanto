import { gameNotFoundError, gamesAlreadyFinishedError, participantNotFoundError } from "../../errors";
import { insufficientFundsError } from "../../errors/insufficient-funds-error";
import betsRepository from "../../repositories/bets-repository";
import gamesRepository from "../../repositories/games-repository";
import participantsRepository from "../../repositories/participants-repository"

async function createBet(homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
    const participantExists = await participantsRepository.getParticipantById(participantId);
    if(!participantExists) throw participantNotFoundError();
    if((participantExists.balance - amountBet) < 0) throw insufficientFundsError();

    const gameExists = await gamesRepository.getGameById(gameId);
    if(!gameExists) throw gameNotFoundError();
    if(gameExists.isFinished) throw gamesAlreadyFinishedError();

    const updatedBalance = participantExists.balance - amountBet;

    const placedBet = await betsRepository.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);
    await participantsRepository.updateBalanceByParticipantId(participantId, updatedBalance);
    return placedBet;
}

export default {
    createBet,
}