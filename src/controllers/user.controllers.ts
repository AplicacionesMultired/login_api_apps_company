import { Request, Response } from "express"
import { validateUser } from "../Schemas/UserSchema"

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await validateUser(req.body)

    if (result.error) {
      return res.status(400).json(result)
    }

    return res.status(201).json({ message: 'Usuario creado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el usuario' })
  }
}