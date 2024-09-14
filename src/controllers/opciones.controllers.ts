import { Request, Response } from 'express';
import { Empresa } from '../model/empresa.model';
import { Area } from '../model/areas.model';


export const gellAllEmpresas = async (req: Request, res: Response) => {
  try {
    const empresas = await Empresa.findAll();
    return res.status(200).json(empresas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

export const getAreas = async (req: Request, res: Response) => {
  try {
    const areas = await Area.findAll();
    return res.status(200).json(areas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}