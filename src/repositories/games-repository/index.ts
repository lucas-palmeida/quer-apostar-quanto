import prisma from "../../config";

async function createGame(homeTeamName: string, awayTeamName: string) {
    return prisma.game.create({
        data: {
            homeTeamName,
            awayTeamName,
        },
    });
};

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
    return prisma.game.update({
        where: {
            id,
        },
        data: {
            homeTeamScore,
            awayTeamScore,
            isFinished: true,
        },
    });
};

async function getGames() {
    return prisma.game.findMany();
};

async function getGameById(id: number) {
    return prisma.game.findFirst({
        where: {
            id,
        },
    });
};

export default {
    createGame,
    finishGame,
    getGames,
    getGameById,
};