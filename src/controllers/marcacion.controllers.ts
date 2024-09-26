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
 

  try {
    const { rows, count } = await Marcacion.findAndCountAll({
      attributes: ['Id', 'codigo', 'Fecha', 'Hora', 'estado'],
      include: [{
        attributes: ['nombres', 'apellidos'],
        model: Persona,
      }]
    });

    // Formatear los datos
    const marcacionesFormateadas = rows.map(m => {
      return {
        id: m.Id,
        nombres: m.Persona!.nombres,
        apellidos: m.Persona.apellidos,
        fecha: m.Fecha,
        hora: m.Hora,
        estado: m.estado
      }
    }).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    // Enviar la respuesta con los datos paginados
    return res.status(200).json({ marcaciones: marcacionesFormateadas, total: count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


// TODO: organizar el audit marcacion
// export const getAuditMarcacion = async (req: Request, res: Response) => {
//   try {
//     const result = await Marcacion.findAll({
//       attributes: ['id', 'fecha_marcacion', 'estado_marcacion'],
//       where: {
//         [Op.and]: [
//           where(fn('DATE', col('fecha_marcacion')), Op.eq, fn('CURDATE')),
//           where(col('estado_marcacion'), Op.eq, 'Entrada')
//         ],
//       },
//       include: [{
//         attributes: ['nombres', 'apellidos'],
//         model: Persona,
//         as: 'Persona',
//         where: { id_Grupo_Horario: { [Op.ne]: null } },
//         include: [{
//           attributes: ['diaSeman'],
//           model: GrupoTurnoVsHorario,
//           where: { diaSeman: getDayOfWeekString() },
//           include: [{
//             attributes: ['descripcion', 'hora_inicio'],
//             model: Turnos
//           }]
//         }]
//       }]
//     });

//     // const marcacionesFormateadas = result.map(marcacion => {
//     //   return {
//     //     id: result.id,
//     //     nombres: result.Persona.nombres,
//     //     apellidos: result.Persona.apellidos,
//     //     hora_marcacion: result.fecha_result.toTimeString().split(' ')[0].slice(0, 5),
//     //     estado_marcacion: result.estado_marcacion,
//     //     hora_inicio: result.Persona.GrupoTurnoVsHorarios[0].Turno.hora_inicio
//     //   }
//     // })

//     return res.status(200).json({'result': result});
//   } catch (error) {
//     console.error('Error al obtener las marcaciones:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };