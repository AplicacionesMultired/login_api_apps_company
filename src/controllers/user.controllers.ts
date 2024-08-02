import { loginUserServices, registerUserServices } from "../services/user.services"
import { validateUser, validateUserLogin } from "../Schemas/UserSchema"
import { Request, Response } from "express"

const JWT_SECRET = process.env.JWT_SECRET as string

import jwt from 'jsonwebtoken'

import isMainError from "../utils/funtions"
import { Company, Procces } from "../utils/Definiciones"

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await validateUser(req.body)

    if (result.error) return res.status(400).json(result)

    const userCreated = await registerUserServices(result.data)

    return res.status(201).json(userCreated)
  } catch (error: unknown) {
    if (isMainError(error)) {
      return res.status(400).json({ errorCode: error.parent.code, message: error.parent.sqlMessage })
    } else if (error instanceof Error) {
      return res.status(500).json({ message: 'Internal server error' })
    } else {
      return res.status(500).json({ message: 'Error desconocido contacte al administrado del sistema' })
    }
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await validateUserLogin(req.body)

    if (result.error) return res.status(400).json(result)

    const user = await loginUserServices(result.data)

    const token = jwt.sign({
      username: user.username,
      email: user.email,
      rol: user.rol,
      company: Company(user.company),
      process: Procces(user.process)
    }, JWT_SECRET, { expiresIn: '2min' })

    return res.cookie('token-user', token, { sameSite: 'none', secure: true }).json({ message: 'Login success', auth: true })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}