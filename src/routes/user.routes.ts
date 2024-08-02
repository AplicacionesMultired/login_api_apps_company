import { createUser, loginUser } from "../controllers/user.controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.post('/register', createUser)

userRouter.post('/login', loginUser)