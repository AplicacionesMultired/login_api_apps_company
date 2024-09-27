import { fn, Op } from 'sequelize';
import { Marcacion } from '../model/marcacion.model'
import { Request, Response } from 'express';

export async function infoMarcaciones(req: Request, res: Response) {

  try {
    const result = await Marcacion.findAll({
      where: { Fecha: { [Op.eq]: fn('CURDATE') } }
    })

    return res.status(200).json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}