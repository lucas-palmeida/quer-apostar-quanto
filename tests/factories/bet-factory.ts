import { faker } from "@faker-js/faker";
import prisma from "../../src/config";
import { buildParticipant } from "./participant-factory";
import { buildGame } from "./game-factory";

export async function buildBet() {
    const participant = await buildParticipant();
    const game = await buildGame();

    return await prisma.bet.create({
        data: {
            homeTeamScore: faker.number.int({
                min: 0,
                max: 10,
            }),
            awayTeamScore: faker.number.int({
                min: 0,
                max: 10,
            }),
            amountBet: participant.balance,
            gameId: game.id,
            participantId: participant.id,
        },
    });
};

export async function buildBetInput(gameId: number, participantId: number, amountBet?: number) {
    return {
        homeTeamScore: faker.number.int({
            min: 0,
            max: 10,
        }),
        awayTeamScore: faker.number.int({
            min: 0,
            max: 10,
        }),
        amountBet: amountBet || 1000,
        gameId: gameId,
        participantId: participantId,
    };
};