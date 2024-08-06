import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import routes from "./routes/index.routes.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { config } from "./config/config.js";
import morgan from "morgan";
import { initMongoDB } from "./daos/mongo/connection.js";

const { PORT } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Passport config
initializePassport();
app.use(passport.initialize());

// Routes
app.use("/api", routes);

app.use(errorHandler);

initMongoDB();

const httpServer = app.listen(PORT, () =>
	console.log(`Server ok on port ${PORT}`)
);
