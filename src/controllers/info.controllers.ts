import { Marcacion } from '../model/marcacion.model'
import { Request, Response } from 'express';
import { fn, Op } from 'sequelize';
import { reduceStates } from '../utils/funtions';

export async function infoMarcaciones(req: Request, res: Response) {

  try {
    const { rows, count } = await Marcacion.findAndCountAll({
      where: { Fecha: { [Op.eq]: fn('CURDATE') } }
    })

    const stados = reduceStates(rows);

    return res.status(200).json({ count, stados })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}