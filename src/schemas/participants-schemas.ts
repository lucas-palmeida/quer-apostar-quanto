import Joi from "joi";

export const participantSchema = Joi.object({
    name: Joi.string().min(3).required(),
    balance: Joi.number().min(1000).required(),
});