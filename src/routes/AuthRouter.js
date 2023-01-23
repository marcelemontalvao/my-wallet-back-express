import express from "express"
import { signIn, signUp } from "../controllers/AuthController.js";
import { validateLoginSchema, validateUserSchema } from "../middleware/SchemaValidation.js";

const authRouter = express.Router();

authRouter.post("/signup", validateUserSchema, signUp);
authRouter.post("/signin", validateLoginSchema, signIn);

export default authRouter;