import * as mocksController from "../controllers/mocks.controller.js";
import { Router } from "express";
const router = Router();

router.post("/generateData", mocksController.createUser);
router.get("/mockingusers", mocksController.mockingUsers);
router.get("/users", mocksController.getUsers);

export default router;
