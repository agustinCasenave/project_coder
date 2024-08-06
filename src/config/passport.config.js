import passport from "passport";
import jwt from "passport-jwt";
import { config } from "../config/config.js";
import { userService } from "../services/user.service.js";
import { createHash, comparePassword } from "../utils/hash.js";
import local from "passport-local";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export function initializePassport() {
	passport.use(
		"current",
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
				secretOrKey: config.JWT_SECRET || "s3cr3t",
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
	// Login Strategy
	passport.use(
		"login",
		new LocalStrategy(
			{
				usernameField: "email",
			},
			async (email, password, done) => {
				try {
					const user = await userService.getUserByEmail(email);

					if (!user) {
						return done(null, false, {
							message: "Usuario no encontrado",
						});
					}

					const isPasswordCorrect = await comparePassword(
						password,
						user.password
					);

					if (!isPasswordCorrect) {
						return done(null, false, {
							message: "Contraseña incorrecta",
						});
					}

					return done(null, user);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	passport.use(
		"register",
		new LocalStrategy(
			{
				usernameField: "email",
				passReqToCallback: true,
			},
			async (req, email, password, done) => {
				try {
					const { first_name, last_name, age } = req.body;

					const userExists = await userService.getUserByEmail(email);

					if (userExists) {
						return done(null, false, {
							message: "El usuario ya existe",
						});
					}

					const hashPassword = await createHash(password);

					const user = await userService.registerUser({
						first_name,
						last_name,
						email,
						age,
						password: hashPassword,
					});

					return done(null, user);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await userService.getUserById(id);
			done(null, user);
		} catch (error) {
			done(error);
		}
	});
}

function cookieExtractor(req) {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["currentUser"];
	}
	return token;
}
