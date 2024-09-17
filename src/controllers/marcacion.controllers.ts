import { Marcacion } from '../model/marcacion';
import { Request, Response } from 'express';

export const getMarcaciones = async (req: Request, res: Response) => {
  try {
    const marcaciones = await Marcacion.findAll();
    return res.status(200).json(marcaciones);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}