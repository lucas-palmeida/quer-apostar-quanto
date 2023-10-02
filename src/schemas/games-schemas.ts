import Joi from "joi";

export const createGameSchema = Joi.object({
    homeTeamName: Joi.string().min(3).required(),
    awayTeamName: Joi.string().min(3).required(),
});

export const finishGameSchema = Joi.object({
    homeTeamScore: Joi.number().min(0).required(),
    awayTeamScore: Joi.number().min(0).required(),
});