import { authorizations } from "../middlewares/authorization.middleware.js";
import sessionRoutes from "./session.routes.js";
import cartRoutes from "./cart.routes.js";
import productRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import mocksRoutes from "./mocks.routes.js";
import { Router } from "express";
import passport from "passport";
import swaggerUI from "swagger-ui-express";
import { info } from "../docs/info.js";
import swaggerJSDoc from "swagger-jsdoc";

const router = Router();

const specs = swaggerJSDoc(info);
router.use("/doc", swaggerUI.serve, swaggerUI.setup(specs));
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
