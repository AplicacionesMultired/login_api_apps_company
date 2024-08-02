import { Request, Response } from "express"
import { validateUser } from "../Schemas/UserSchema"
import { User } from "../model/user.model"

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await validateUser(req.body)

    if (result.error) {
      return res.status(400).json(result)
    }

    const threeLastDocument = result.data.document.toString().slice(-3)
    const username = `CP${result.data.document}`
    const password = `CP${threeLastDocument}`

    const state = true

    await User.sync()

    const userCreated = await User.create({ ...result.data, username, password, state })
    
    return res.status(201).json(userCreated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el usuario' })
  }
}