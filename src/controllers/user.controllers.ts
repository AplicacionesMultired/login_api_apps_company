import { Request, Response } from "express"

export const createUser = async (req: Request, res: Response) => {
  try {
    // const user = await User.create({ name, email, password })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el usuario' })
  }
}