import { faker } from "@faker-js/faker";
import prisma from "../../src/config";

export async function buildParticipant(name?: string, balance?: number) {
    return await prisma.participant.create({
        data: {
            name: name || faker.internet.userName(),
            balance: balance || faker.number.int({
                min: 1000,
                max: 1000000,
            }),
        }
    });
};

export async function buildParticipantInput(name?: string, balance?: number) {
    return {
        name: name || faker.internet.userName(),
        balance: balance || faker.number.int({
            min: 1000,
            max: 1000000,
        }),
    };
};