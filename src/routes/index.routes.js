import { authorizations } from "../middlewares/authorization.middleware.js";
import sessionRoutes from "./session.routes.js";
import cartRoutes from "./cart.routes.js";
import productRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import mocksRoutes from "./mocks.routes.js";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.use("/session", sessionRoutes);
router.use("/user", userRoutes);
router.use(
	"/cart",
	passport.authenticate("current", { session: false }),
	cartRoutes
);
router.use("/products", productRoutes);
router.use("/mocks", mocksRoutes);

export default router;
