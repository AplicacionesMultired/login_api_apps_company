import { createUser, loginUser, logoutUser, UserByToken } from "../controllers/user.controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.get('/profile', UserByToken)

userRouter.post('/login', loginUser)

userRouter.get('/logout', logoutUser)

userRouter.post('/register', createUser)