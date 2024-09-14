import { Request, Response } from 'express';
import { Empresa } from '../model/empresa.model';


export const gellAllEmpresas = async (req: Request, res: Response) => {
  try {
    const empresas = await Empresa.findAll();
    res.json(empresas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}