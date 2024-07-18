import passport from "passport";
import jwt from "passport-jwt";
import 'dotenv/config'
import { userService } from "../services/user.service.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export function initializePassport() {
  passport.use(
    "current",
    new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.PRIVATE_KEY || 's3cr3t',
    },
      async (payload, done) => {
        try {
            const user = await userService.getUserById(payload.sub);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
      }
    )
  );
}

function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}