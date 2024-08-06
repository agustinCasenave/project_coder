import { userPublicDto } from "../dtos/userPublic.dto.js";

export function validate(schema) {
	return async (req, res, next) => {
		const { error } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({
				error: error.details[0].message,
			});
		}

		next();
	};
}

// Function to create the user DTO using the Joi schema
export function createUserDTO(user) {
	const { error, value } = userPublicDto.validate(user, {
		stripUnknown: true, // Remove unknown properties
	});
	if (error) {
		console.error("Validation Error:", error); // Log validation errors
		throw new Error(`Invalid user data: ${error.message}`);
	}
	return value;
}
