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

async function getParticipantById(id: number) {
    return prisma.participant.findFirst({
        where: {
            id,
        },
    });
};

async function updateBalanceByParticipantId(id: number, balance: number) {
    return prisma.participant.update({
        where: {
            id,
        },
        data: {
            balance,
        },
    });
};

export default {
    createParticipant,
    getParticipants,
    getParticipantById,
    updateBalanceByParticipantId,
};