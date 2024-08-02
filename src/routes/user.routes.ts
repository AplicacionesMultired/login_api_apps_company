import { createUser, loginUser, UserByToken } from "../controllers/user.controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.get('/profile', UserByToken)

userRouter.post('/login', loginUser)

userRouter.post('/register', createUser)