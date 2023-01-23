import express from "express"
import { getUser, signUp } from "../controllers/AuthController.js";
import { validateUser } from "../middleware/AuthMiddleware.js";
import { validateUserSchema } from "../middleware/SchemaValidation.js";

const authRouter = express.Router();

authRouter.post("/user", validateUserSchema, signUp);
authRouter.get("/user", validateUser, getUser);

export default authRouter;