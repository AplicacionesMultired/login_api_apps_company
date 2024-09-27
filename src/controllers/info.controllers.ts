import { Marcacion } from '../model/marcacion.model'
import { Request, Response } from 'express';
import { Estado } from '../types/info';
import { fn, Op } from 'sequelize';

const estadosMap: { [key: string]: Estado } = {
  'Entrada': Estado.Entrada,
  'Salida_intermedia': Estado.SalidaIntermedia,
  'Entrada_intermedia': Estado.EntradaIntermedia,
  'Salida': Estado.Salida
};
export async function infoMarcaciones(req: Request, res: Response) {

  try {
    const { rows, count } = await Marcacion.findAndCountAll({
      where: { Fecha: { [Op.eq]: fn('CURDATE') } }
    })

    const stados = rows.reduce((acc, mar) => {
      const key = estadosMap[mar.estado];
      if (key) { acc[key] += 1; }
      return acc
    }, { 
      [Estado.Entrada]: 0,
      [Estado.SalidaIntermedia]: 0,
      [Estado.EntradaIntermedia]: 0,
      [Estado.Salida]: 0
    })

    return res.status(200).json({ count, stados })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' })
  }
}