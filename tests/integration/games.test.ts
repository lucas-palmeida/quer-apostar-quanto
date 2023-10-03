import supertest from "supertest";
import app from "../../src/app";
import { CreateGameInput, FinishGameInput } from "../../src/protocols";
import httpStatus from "http-status";
import { cleanDb } from "../helpers";
import { buildGame, buildGameInput, buildScoreInput } from "../factories/game-factory";
import prisma from "../../src/config";
import { Game } from "@prisma/client";

const api = supertest(app);

beforeEach(async () => {
    await cleanDb();
});

describe("POST /games", () => {
    it("should create a new game and return its data with status 201", async () => {
        const gameInput: CreateGameInput = await buildGameInput();

        const { status } = await api.post("/games").send(gameInput);
        expect(status).toBe(httpStatus.CREATED);
        const gamesList = await prisma.game.findMany();
        expect(gamesList).toHaveLength(1);
        const game = gamesList[0];
        expect(game).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            homeTeamName: gameInput.homeTeamName,
            awayTeamName: gameInput.awayTeamName,
            homeTeamScore: 0,
            awayTeamScore: 0,
            isFinished: false,
        });
    });

    it("should return status 400 when body is missing some atribute", async () => {
        const gameInput = {
            homeTeamName: "Laurindo FC",
        };

        const { status } = await api.post("/games").send(gameInput);
        expect(status).toBe(httpStatus.BAD_REQUEST);
    });
});

describe("POST /games/:id/finish", () => {
    it("should finish a game by id and return its data with status 200", async () => {
        const createdGame: Game = await buildGame();
        const gameScore: FinishGameInput = await buildScoreInput();

        const { status } = await api.post(`/games/${createdGame.id}/finish`).send(gameScore);
        expect(status).toBe(httpStatus.OK);
        const game = await prisma.game.findFirst({ where: { id: createdGame.id } });
        expect(game).toEqual({
            id: createdGame.id,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            homeTeamName: createdGame.homeTeamName,
            awayTeamName: createdGame.awayTeamName,
            homeTeamScore: gameScore.homeTeamScore,
            awayTeamScore: gameScore.awayTeamScore,
            isFinished: true,
        });
    });

    it("should return status 404 when game with the required id doesnt exists", async () => {
        const gameScore: FinishGameInput = await buildScoreInput();

        const { status } = await api.post(`/games/103549/finish`).send(gameScore);
        expect(status).toBe(httpStatus.NOT_FOUND);
    });

    it("should return status 409 when game's already finished", async () => {
        const createdGame: Game = await buildGame();
        const gameScore: FinishGameInput = await buildScoreInput();

        await api.post(`/games/${createdGame.id}/finish`).send(gameScore);
        const { status } = await api.post(`/games/${createdGame.id}/finish`).send(gameScore);
        expect(status).toBe(httpStatus.CONFLICT);
    });

    it("should return status 404 when game with the required id doesnt exists", async () => {
        const createdGame: Game = await buildGame();

        const { status } = await api.post(`/games/${createdGame.id}/finish`).send({ homeTeamScore: 7 });
        expect(status).toBe(httpStatus.BAD_REQUEST);
    });
})

describe("GET /games", () => {
    it("should return all games with status 200", async () => {
        await buildGame();
        await buildGame();
        await buildGame();

        const { body, status } = await api.get("/games");
        expect(status).toBe(httpStatus.OK);
        expect(body).toHaveLength(3);
        expect(body).toEqual(
            expect.arrayContaining([{
                id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                homeTeamName: expect.any(String),
                awayTeamName: expect.any(String),
                homeTeamScore: expect.any(Number),
                awayTeamScore: expect.any(Number),
                isFinished: false,
            }])
        );
    });

    it("should return an empty array when doesnt have games with status 200", async () => {
        const { body, status } = await api.get("/games");
        expect(status).toBe(httpStatus.OK);
        expect(body).toHaveLength(0);
        expect(body).toEqual([]);
    });
});

describe("GET /games/:id", () => {
    it("should return games with the provided id and status 200", async () => {
        const createdGame: Game = await buildGame();

        const { body, status } = await api.get(`/games/${createdGame.id}`);
        expect(status).toBe(httpStatus.OK);
        expect(body).toEqual({
            id: createdGame.id,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            homeTeamName: createdGame.homeTeamName,
            awayTeamName: createdGame.awayTeamName,
            homeTeamScore: 0,
            awayTeamScore: 0,
            isFinished: false,
            bets: []
        });
    });

    it("should return status 404 when game with provided id doesnt exists", async () => {
        const { status } = await api.get("/games/1348945");
        expect(status).toBe(httpStatus.NOT_FOUND);
    });
});