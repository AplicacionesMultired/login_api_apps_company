import { Request, Response } from 'express';
import { Persona } from '../model/persona.model';

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
    const persona = await Persona.findByPk(id);
    
    return res.status(200).json(persona);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
}