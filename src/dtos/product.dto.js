import Joi from "joi";

export const productDto = Joi.object({
	title: Joi.string().required(),
	code: Joi.string().required(),
	stock: Joi.number().required(),
	category: Joi.string().required(),
	description: Joi.string().required(),
	price: Joi.number().required(),
});
