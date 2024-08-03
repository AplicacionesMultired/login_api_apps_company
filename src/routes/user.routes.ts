import { createUser, loginUser, UserByToken } from "../controllers/user.controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.get('/profile', UserByToken)

userRouter.post('/login', loginUser)

userRouter.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.send('Logged out')
})

userRouter.post('/register', createUser)