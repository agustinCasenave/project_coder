import { Router } from "express";
import { middleware_existUser } from "../middlewares/existUser.middleware.js";
import { userDto } from "../dtos/user.dto.js";
import { userPublicDto } from "../dtos/userPublic.dto.js";
import { validate } from "../middlewares/validation.middleware.js";
import { userController } from "../controllers/user.controller.js";

const router = Router();
router.post(
	"/register",
	middleware_existUser,
	validate(userDto),
	userController.registerUser
); //Register User
router.get("/:email", userController.getUserByEmail); //Get User by email
router.delete("/:email", userController.deleteUser); //Delete User by email
router.put("/:email", userController.updateUser); //Update User by email

export default router;
