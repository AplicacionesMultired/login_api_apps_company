import { Marcacion } from '../model/marcacion';
import { Request, Response } from 'express';
import { fn, col, Op } from 'sequelize';

export const getMarcaciones = async (req: Request, res: Response) => {
  try {

    const marcaciones = await Marcacion.findAll({
      attributes: ['id', 'id_empleado', 'fecha_marcacion', 'estado_marcacion'], 
      where: (fn('DATE', col('fecha_marcacion')), Op.eq, fn('CURDATE')),
      limit: 20
    });

    const marcacionesFormateadas = marcaciones.map(marcacion => {
      return {
        id: marcacion.id,
        id_empleado: marcacion.id_empleado,
        fecha_marcacion: marcacion.fecha_marcacion.toDateString() + ' ' +  marcacion.fecha_marcacion.toTimeString().split(' ')[0],
        estado_marcacion: marcacion.estado_marcacion
      }
    })

    return res.status(200).json(marcacionesFormateadas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}