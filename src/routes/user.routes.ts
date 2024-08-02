import { createUser } from "../controllers/user.controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.post('/register', createUser)