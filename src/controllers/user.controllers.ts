import { registerUserServices } from "../services/user.services"
import { validateUser } from "../Schemas/UserSchema"
import { Request, Response } from "express"
import isMainError from "../utils/funtions"

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await validateUser(req.body)

    if (result.error) return res.status(400).json(result)

    const userCreated = await registerUserServices(result.data)
    
    return res.status(201).json(userCreated)
  } catch (error: unknown) {
    if (isMainError(error)) {
      return res.status(400).json({ errorCode: error.parent.code, message: error.parent.sqlMessage})
    } else if (error instanceof Error) {
      console.log('General error:', error.message);
      return res.status(500).json({ message: 'Internal server error' })
    } else {
      console.log('Unknown error:', error);
      return res.status(500).json({ message: 'Error desconocido contacte al administrado del sistema' })
    }
  }
} 