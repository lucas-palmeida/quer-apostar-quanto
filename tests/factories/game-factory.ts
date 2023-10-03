import { faker } from "@faker-js/faker";
import prisma from "../../src/config";

export async function buildGame(homeTeamName?: string, awayTeamName?: string) {
    return await prisma.game.create({
        data: {
            homeTeamName: homeTeamName || faker.company.name(),
            awayTeamName: awayTeamName || faker.company.name(),
        }
    });
};

export async function buildGameInput(homeTeamName?: string, awayTeamName?: string) {
    return {
        homeTeamName: homeTeamName || faker.company.name(),
        awayTeamName: awayTeamName || faker.company.name(),
    };
};

export async function buildScoreInput(homeTeamScore?: number, awayTeamScore?: number) {
    return {
        homeTeamScore: homeTeamScore || faker.number.int({
            min: 0,
            max: 10,
        }),
        awayTeamScore: awayTeamScore || faker.number.int({
            min: 0,
            max: 10,
        })
    };
};