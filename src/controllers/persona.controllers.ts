import { Request, Response } from 'express';
import { Persona } from '../model/persona.model';
import { Area } from '../model/areas.model';
import { Cargo } from '../model/cargos.model';
import { GrupoHorario } from '../model/grupohorario.model';

export const getPersonas = async (req: Request, res: Response) => {
  try {
    const personas = await Persona.findAll({ attributes: ['id', 'identificacion', 'nombres', 'apellidos'] });
    
    return res.status(200).json(personas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
}

export const getPersonaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findOne({
      where: { id },
      attributes: ['id', 'identificacion', 'nombres', 'apellidos', 'email', 'telefono']
    });

    const Areas = await Area.findAll();
    const Cargos = await Cargo.findAll();
    const GruposHorario = await GrupoHorario.findAll();
    
    return res.status(200).json({ persona, options: { Areas, Cargos, GruposHorario } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
}