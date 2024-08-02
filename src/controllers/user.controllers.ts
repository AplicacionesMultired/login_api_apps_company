import { validateUser } from "../Schemas/UserSchema"
import { Request, Response } from "express"
import { User } from "../model/user.model"
import bycryt from 'bcryptjs'

import 'dotenv/config'

const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS as string

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await validateUser(req.body)

    // !! Esta lógica podría ser llevada a un servicio y mejorar la legibilidad del código

    if (result.error) {
      return res.status(400).json(result)
    }

    const threeLastDocument = result.data.document.toString().slice(-3)
    const username = `CP${result.data.document}`
    const pass = `CP${threeLastDocument}`
    const password = bycryt.hashSync(pass, parseInt(BCRYPT_SALT_ROUNDS))

    const state = true

    await User.sync()
    const userCreated = await User.create({ ...result.data, username, password, state })
    
    return res.status(201).json(userCreated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el usuario' })
  }
}