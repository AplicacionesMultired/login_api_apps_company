import { loginUserServices, registerUserServices } from "../services/user.services"
import { validateUser, validateUserLogin } from "../Schemas/UserSchema"
import { Request, Response } from "express"

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN as string
const NODE_ENV = process.env.ENTORNO as string

import jwt from 'jsonwebtoken'

import isMainError from "../utils/funtions"
import { Company, Procces, Sub_Procces } from "../utils/Definiciones"

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
    const result = await validateUserLogin(req.body);

    if (result.error) return res.status(400).json(result);

    const user = await loginUserServices(result.data);

    const app = result.data.app;
    
    const usuario = {
      id: user.id,
      names: user.names,
      lastnames: user.lastNames,
      username: user.username,
      email: user.email,
      company: Company(user.company),
      process: Procces(user.process),
      sub_process: Sub_Procces(user.sub_process),
      app: app
    }

    jwt.sign(usuario, JWT_SECRET, { expiresIn: JWT_EXPIRES }, (err, token) => {
      if (err) throw err;
      return res.cookie(app, token, {
        sameSite: NODE_ENV === 'dev' ? 'lax' : 'none',
        secure: NODE_ENV === 'dev' ? false : true,
      })
        .status(200).json({ message: 'Login successful', usuario });
    });
  } catch (error: unknown) {
    const err = error as Error;
    return res.status(400).json(err.message);
  }
}

export const UserByToken = async (req: Request, res: Response) => {
  try {
    const app: string = req.query.app as string;
    const token = req.cookies[app];
  
    if (token) {
      jwt.verify(token, JWT_SECRET, {}, async (err, decoded) => {
        if (err) throw err;
        return res.status(200).json(decoded);
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export const logoutUser = async (req: Request, res: Response) => {
  const token = req.body.token as string;
  const log = token.split('=')[0]
   
  try {
    // TODO: en el futuro se debe recibir el nombre de la cookie a eliminar
    return res.clearCookie(log).status(200).json({ message: 'Logout successful' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}