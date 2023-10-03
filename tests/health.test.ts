import supertest from "supertest";
import app from "../src/app";
import httpStatus from "http-status";

const api = supertest(app);

describe("/GET health", () => {
    it("should return status 200", async () => {
        const { status, text } = await api.get("/health");
        expect(status).toBe(httpStatus.OK);
        expect(text).toBe("I'm fine!");
    });
});