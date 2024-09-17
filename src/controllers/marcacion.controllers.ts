import { col, fn, Op, where } from 'sequelize';
import { Marcacion } from '../model/marcacion.model';
import { Persona } from '../model/persona.model';
import { Request, Response } from 'express';
import { marcacion } from '../connections/marcacion';

export const getMarcaciones = async (req: Request, res: Response) => {
  // Obtener los parámetros de paginación de la solicitud
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = parseInt(req.query.pageSize as string, 10) || 20;
  const fecha = req.query.fecha as string;
  
  // Calcular el offset
  const offset = (page - 1) * pageSize;

  try {
    // Realizar la consulta con paginación
    const { count, rows } = await Marcacion.findAndCountAll({
      attributes: ['id', 'id_empleado', 'fecha_marcacion', 'estado_marcacion'],
      where: {
        [Op.and]: [
          where(fn('DATE', col('fecha_marcacion')), Op.eq, (fecha ? fecha : fn('CURDATE')))
        ]
      },
       limit: pageSize,
      offset: offset,
      order: [['id', 'DESC']],
      include: [{
        model: Persona,
        attributes: ['nombres', 'apellidos'],
      }]
    });


    // Formatear los datos
    const marcacionesFormateadas = rows.map(marcacion => {
      return {
        id: marcacion.id,
        nombres: marcacion.Persona.nombres,
        apellidos: marcacion.Persona.apellidos,
        fecha_marcacion: marcacion.fecha_marcacion.toDateString() + ' ' + marcacion.fecha_marcacion.toTimeString().split(' ')[0],
        estado_marcacion: marcacion.estado_marcacion
      }
    });

    // Enviar la respuesta con los datos paginados
    return res.status(200).json({ page, pageSize, total: count, marcaciones: marcacionesFormateadas });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}