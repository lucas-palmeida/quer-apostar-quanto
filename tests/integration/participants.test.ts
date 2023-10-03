import supertest from "supertest";
import app from "../../src/app";
import { ParticipantInput } from "../../src/protocols";
import httpStatus from "http-status";
import prisma from "../../src/config";
import { buildParticipant, buildParticipantInput } from "../factories/participant-factory";
import { cleanDb } from "../helpers";

const api = supertest(app);

beforeAll(async () => {
    await cleanDb();
});

beforeEach(async () => {
    await cleanDb();
});

describe("POST /participants", () => {
    it("should create a new participant and return its data with status 201", async () => {
        const participantInput: ParticipantInput = await buildParticipantInput();

        const { status } = await api.post("/participants").send(participantInput);
        expect(status).toBe(httpStatus.CREATED);
        const participantsList = await prisma.participant.findMany();
        expect(participantsList).toHaveLength(1);
        const participant = participantsList[0];
        expect(participant).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            name: participantInput.name,
            balance: participantInput.balance,
        });
    });

    it("should return status 400 when body is missing some atribute", async () => {
        const participantInput = {
            name: "Laurindo",
        };

        const { status } = await api.post("/participants").send(participantInput);
        expect(status).toBe(httpStatus.BAD_REQUEST);
    });
});

describe("GET /participants", () => {
    it("should return all participants with status 200", async () => {
        await buildParticipant();
        await buildParticipant();
        await buildParticipant();

        const { body, status } = await api.get("/participants");
        expect(status).toBe(httpStatus.OK);
        expect(body).toHaveLength(3);
        expect(body).toEqual(
            expect.arrayContaining([{
                id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: expect.any(String),
                balance: expect.any(Number)
            }])
        );
    });

    it("should return an empty array when doesnt have participants with status 200", async () => {
        const { body, status } = await api.get("/participants");
        expect(status).toBe(httpStatus.OK);
        expect(body).toHaveLength(0);
        expect(body).toEqual([]);
    });
});