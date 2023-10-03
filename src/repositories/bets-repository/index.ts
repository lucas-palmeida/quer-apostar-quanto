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

async function updateBet(id: number, status: string, amountWon: number) {
    return prisma.bet.update({
        where: {
            id,
        },
        data: {
            status,
            amountWon,
        }
    });
};

async function getBets(gameId: number) {
    return prisma.bet.findMany({
        where: {
            gameId,
        }
    });
}

export default {
    createBet,
    updateBet,
    getBets,
}