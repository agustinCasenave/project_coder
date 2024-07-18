import { Router } from "express";
import * as userService from "../services/user.service.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken, verifyToken } from "../utils/jwt.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
            return res.status(400).json({ error: "Falta el email o la contraseña" });
    }
    
    try {
            const user = await userService.getUserByEmail(email);
            
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            
            const isPasswordCorrect = await comparePassword(password, user.password);
            
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }
            
            const token = generateToken({ email: user.email, role: user.role, cart: user.cart, id: user.id, first_name: user.first_name, last_name: user.last_name, age: user.age });
            
            res.cookie("currentUser", token, { maxAge: 100000 });
            
            res.status(200).json({ message: "Sesión iniciada" });
        }catch (error) {
            res.status(500).json({ error: "Error al iniciar sesión", details: error.message });
    }
});

router.get('/current', async (req, res) => {
    const token = req.cookies.currentUser;

    if (!token) {
        return res.status(401).json({ error: "No autorizado" });
    }

    try {
        const user = verifyToken(token);
        const userDB = await userService.getUserById(user.sub);

        if (!userDB) {
        return res.status(404).json({ error: "No se encontró el usuario" });
        }

        res.status(200).json(user);
    } catch (error) {
        res
        .status(500)
        .json({ error: "Error al obtener el usuario", details: error.message });
    }
});

export default router;