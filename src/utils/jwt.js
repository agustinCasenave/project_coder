import jwt from "jsonwebtoken";
import 'dotenv/config'

const PRIVATE_KEY = process.env.PRIVATE_KEY || 's3cr3t';

export const generateToken = (user) => {
    const payload = {
        user,
        sub: user.id
    };
    return jwt.sign(payload, PRIVATE_KEY, { expiresIn: "10m" });
};


//Función para verificar token
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, PRIVATE_KEY);
  
        return decoded;
    } catch (error) {
        console.log(error);
        throw new Error("Token no valido");
    }
  }