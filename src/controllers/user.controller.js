import * as service from "../services/user.service.js";
import { createHash } from "../utils/hash.js";

export const registerUser = async (req, res, next) => {
    try {
        const { email, password, first_name, last_name, age } = req.body

        const hashPassword = await createHash(password);

        const newUser = {
            email,
            password: hashPassword,
            first_name,
            last_name,
            age,
        }
        const user = await service.registerUser(newUser);
        if (!user) return res.status(404).json({ msg: "Error create user" });
        else {
            return res.status(200).json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params
        const user = await service.getUserByEmail(email)
        if(!user) return res.status(404).json({msg: "User not found"})
        else return res.status(200).json(user)
    } catch (error) {
        throw new Error(error);
    }
}   

export const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.params
        const user = await service.deleteUser(email)
        if (!user) return res.status(404).json({msg: "User not found"})
        else return res.status(200).json(user)
    } catch (error) {
        throw new Error(error);
    }
}   

export const updateUser = async (req, res, next) => {
    try {
        const { email } = req.params
        const user = await service.updateUser(email, req.body)
        if (!user) return res.status(404).json({msg: "User not found"})        
        else return res.status(200).json(user)
    } catch (error) {
        throw new Error(error);
    }
}
