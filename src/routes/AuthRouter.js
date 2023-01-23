import express from "express"
import { getUser, signUp } from "../controllers/AuthController.js";
import { validateLoginSchema, validateUserSchema } from "../middleware/SchemaValidation.js";

const authRouter = express.Router();

authRouter.post("/user", validateUserSchema, signUp);
authRouter.get("/user", validateLoginSchema, getUser);

export default authRouter;