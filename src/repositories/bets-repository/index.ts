import prisma from "../../config";

async function createBet(homeTeamScore: number, awayTeamScore: number, amountBet: number, gameId: number, participantId: number) {
    return prisma.bet.create({
        data: {
            homeTeamScore,
            awayTeamScore,
            amountBet,
            gameId,
            participantId,
        },
    });
};

export default {
    createBet,
}