import { Router } from "express";
import * as controller from "../controllers/user.controller.js";

const router = Router();
router.post('/register', controller.registerUser)       //Create User. Data on body. Id Autogenerated
router.get('/:email', controller.getUserByEmail)        //Get User by email
router.delete('/:email', controller.deleteUser)         //Delete User by email
router.put('/:email', controller.updateUser)            //Update User by email

export default router;