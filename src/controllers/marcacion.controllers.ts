import { Marcacion } from '../model/marcacion.model';
import { Persona } from '../model/persona.model';
import { Request, Response } from 'express';

export const getMarcaciones = async (req: Request, res: Response) => {
  // Obtener los parámetros de paginación de la solicitud
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = parseInt(req.query.pageSize as string, 10) || 20;
  
  // Calcular el offset
  const offset = (page - 1) * pageSize;

  try {
    // Realizar la consulta con paginación
    const { count, rows } = await Marcacion.findAndCountAll({
      attributes: ['id', 'id_empleado', 'fecha_marcacion', 'estado_marcacion'],
      limit: pageSize,
      offset: offset,
      order: [['id', 'DESC']],
      include: [{
        model: Persona,
        attributes: ['nombres'],
      }]
    });

    // Formatear los datos
    const marcacionesFormateadas = rows.map(marcacion => {
      return {
        id: marcacion.id,
        nombres: marcacion.Persona.nombres,
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