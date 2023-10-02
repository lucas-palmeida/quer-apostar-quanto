import prisma from "../../config";

async function createParticipant(name: string, balance: number) {
    return prisma.participant.create({
        data: {
            name,
            balance
        },
    });
};

async function getParticipants() {
    return prisma.participant.findMany();
}

export default {
    createParticipant,
    getParticipants,
};