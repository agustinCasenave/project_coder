import Joi from "joi";
import mongoose from 'mongoose';

// Define validation rule for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
	if (!mongoose.Types.ObjectId.isValid(value)) {
	  return helpers.message('Invalid ObjectId');
	}
	return value;
  }, 'ObjectId validation');

// Define the Joi schema for the user DTO
export const userPublicDto = Joi.object({
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
	email: Joi.string().email().required(),
	age: Joi.number().required(),
	role: Joi.string().optional(),
	cart: Joi.required(),
});
