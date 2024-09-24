import { GrupoTurnoVsHorario } from '../model/GrupoTurnoVsHorario';
import { Marcacion } from '../model/marcacion.model';
import { Persona } from '../model/persona.model';
import { col, fn, Op, where } from 'sequelize';
import { Turnos } from '../model/turnos.model';
import { Request, Response } from 'express';

const getDayOfWeekString = (): string => {
  const dayIndex = new Date().getDay();
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return daysOfWeek[dayIndex];
};

export const getMarcaciones = async (req: Request, res: Response) => {

  const fechaInitial = req.query.fechaInitial as string;
  const fechaFinal = req.query.fechaFinal as string;

  // where(fn('DATE', col('fecha_marcacion')), Op.eq, (fecha ? fecha : fn('CURDATE')))

  const opc = [{ fecha_marcacion: { [Op.between]: [fechaInitial, fechaFinal] } } ]
  const opc2 = where(fn('DATE', col('fecha_marcacion')), Op.eq, (fechaInitial ? fechaInitial : fn('CURDATE')))

  try {
    const { count, rows } = await Marcacion.findAndCountAll({
      attributes: ['id', 'id_empleado', 'fecha_marcacion', 'estado_marcacion'],
      where: {
        [Op.and]: fechaFinal ? opc : opc2
      },
      order: [['id', 'DESC']],
      include: [{
        model: Persona,
        attributes: ['nombres', 'apellidos'],
      }]
    });

    console.log(count);

    // Formatear los datos
    const marcacionesFormateadas = rows.map(marcacion => {
      return {
        id: marcacion.id,
        nombres: marcacion.Persona.nombres,
        apellidos: marcacion.Persona.apellidos,
        fecha_marcacion: marcacion.fecha_marcacion.toDateString() + ' ' + marcacion.fecha_marcacion.toTimeString().split(' ')[0],
        estado_marcacion: marcacion.estado_marcacion
      }
    }).sort((a, b) => new Date(b.fecha_marcacion).getTime() - new Date(a.fecha_marcacion).getTime());

    // Enviar la respuesta con los datos paginados
    return res.status(200).json(marcacionesFormateadas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getAuditMarcacion = async (req: Request, res: Response) => {
  try {
    const result = await Marcacion.findAll({
      attributes: ['id', 'fecha_marcacion', 'estado_marcacion'],
      where: {
        [Op.and]: [
          where(fn('DATE', col('fecha_marcacion')), Op.eq, fn('CURDATE')),
          where(col('estado_marcacion'), Op.eq, 'Entrada')
        ],
      },
      include: [{
        attributes: ['nombres', 'apellidos'],
        model: Persona,
        as: 'Persona',
        where: { id_Grupo_Horario: { [Op.ne]: null } },
        include: [{
          attributes: ['diaSeman'],
          model: GrupoTurnoVsHorario,
          where: { diaSeman: getDayOfWeekString() },
          include: [{
            attributes: ['descripcion', 'tolerancia_despues_entrada'],
            model: Turnos
          }]
        }]
      }]
    });

    const marcacionesFormateadas = result.map(marcacion => {
      return {
        id: marcacion.id,
        nombres: marcacion.Persona.nombres,
        apellidos: marcacion.Persona.apellidos,
        hora_marcacion: marcacion.fecha_marcacion.toTimeString().split(' ')[0].slice(0, 5),
        estado_marcacion: marcacion.estado_marcacion,
        hora_inicio: marcacion.Persona.GrupoTurnoVsHorarios[0].Turno.tolerancia_despues_entrada
      }
    })

    return res.status(200).json(marcacionesFormateadas);
  } catch (error) {
    console.error('Error al obtener las marcaciones:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};