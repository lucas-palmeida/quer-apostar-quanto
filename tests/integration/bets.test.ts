import supertest from "supertest";
import app from "../../src/app";
import { CreateBetInput } from "../../src/protocols";
import httpStatus from "http-status";
import prisma from "../../src/config";
import { buildParticipant } from "../factories/participant-factory";
import { cleanDb } from "../helpers";
import { buildBetInput } from "../factories/bet-factory";
import { buildGame } from "../factories/game-factory";
import { Game, Participant } from "@prisma/client";

const api = supertest(app);

beforeEach(async () => {
    await cleanDb();
});

describe("POST /bets", () => {
    it("should create a new bet and return its data with status 201", async () => {
        const game: Game = await buildGame();
        const participant: Participant = await buildParticipant();
        const betInput: CreateBetInput = await buildBetInput(game.id, participant.id, participant.balance);

        const { status } = await api.post("/bets").send(betInput);
        expect(status).toBe(httpStatus.CREATED);
        const betsList = await prisma.bet.findMany();
        expect(betsList).toHaveLength(1);
        const bet = betsList[0];
        expect(bet).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            homeTeamScore: betInput.homeTeamScore,
            awayTeamScore: betInput.awayTeamScore,
            amountBet: betInput.amountBet,
            gameId: game.id,
            participantId: participant.id,
            status: expect.any(String),
            amountWon: null,
        });
    });

    it("should return status 400 when body is missing some atribute", async () => {
        const betInput = {
            homeTeamScore: 5,
        };

        const { status } = await api.post("/bets").send(betInput);
        expect(status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return status 404 when participant id is invalid", async () => {
        const game: Game = await buildGame();
        const betInput: CreateBetInput = await buildBetInput(game.id, 987451, 1000);

        const { status } = await api.post("/bets").send(betInput);
        expect(status).toBe(httpStatus.NOT_FOUND);
    });

    it("should return status 400 when amount bet is invalid", async () => {
        const game: Game = await buildGame();
        const participant: Participant = await buildParticipant();
        const betInput: CreateBetInput = await buildBetInput(game.id, participant.id, (participant.balance +1500));

        const { status } = await api.post("/bets").send(betInput);
        expect(status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return status 404 when game id is invalid", async () => {
        const participant: Participant = await buildParticipant();
        const betInput: CreateBetInput = await buildBetInput(9874561, participant.id, (participant.balance));

        const { status } = await api.post("/bets").send(betInput);
        expect(status).toBe(httpStatus.NOT_FOUND);
    });
});