import { Empresa } from '../model/empresa.model';
import { Request, Response } from 'express';
import { Area } from '../model/areas.model';
import { Cargo } from '../model/cargos.model'; 
import { Turno } from '../model/turnos.model';

export const gellAllEmpresas = async (req: Request, res: Response) => {
  try {
    const empresas = await Empresa.findAll();
    return res.status(200).json(empresas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getAreas = async (req: Request, res: Response) => {
  try {
    const areas = await Area.findAll();
    return res.status(200).json(areas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const newArea = async (req: Request, res: Response) => {
  const { codigo, nombre } = req.body;

  if (!codigo || !nombre) {
    return res.status(400).json({ message: 'código y nombre área son requeridos' });
  }

  try {
    const exist = await Area.findOne({ where: { codigo } });

    console.log(exist);

    if (exist) {
      return res.status(400).json({ message: 'El código de área ya existe' });
    }

    const result = await Area.create({ codigo, descripcion: nombre });

    if (!result) {
      return res.status(400).json({ message: 'No se pudo crear el área' });
    }

    return res.status(201).json({ message: 'Area Creada Correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteArea = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'id es requerido' });
  }

  try {
    const result = await Area.destroy({ where: { id } });
    if (!result) {
      return res.status(400).json({ message: 'No se pudo eliminar el área' });
    }

    return res.status(200).json({ message: 'Area Eliminada Correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateArea = async (req: Request, res: Response) => {
  const { id, codigo, nombre } = req.body;

  if (!id || !codigo || !nombre) {
    return res.status(400).json({ message: 'id, código y nombre área son requeridos' });
  }

  try {
    const result = await Area.update({ codigo, descripcion: nombre }, { where: { id } });

    if (!result) {
      return res.status(400).json({ message: 'No se pudo actualizar el área' });
    }

    return res.status(200).json({ message: 'Area Actualizada Correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getAllCargos = async (req: Request, res: Response) => {
  try {
    const cargos = await Cargo.findAll();
    return res.status(200).json(cargos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const newCargo = async (req: Request, res: Response) => {
  const { codigo, nombre } = req.body;

  if (!codigo || !nombre) {
    return res.status(400).json({ message: 'código y nombre cargo son requeridos' });
  }

  try {
    const exist = await Cargo.findOne({ where: { codigo } });

    if (exist) {
      return res.status(400).json({ message: 'El código de cargo ya existe' });
    }

    const result = await Cargo.create({ codigo, descripcion: nombre });

    if (!result) {
      return res.status(400).json({ message: 'No se pudo crear el cargo' });
    }

    return res.status(201).json({ message: 'Cargo Creado Correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteCargo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'id es requerido' });
  }

  try {
    const result = await Cargo.destroy({ where: { ID: id } });
    if (!result) {
      return res.status(400).json({ message: 'No se pudo eliminar el cargo' });
    }

    return res.status(200).json({ message: 'Cargo Eliminado Correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateCargo = async (req: Request, res: Response) => {
  const { id, codigo, nombre } = req.body;

  if (!id || !codigo || !nombre) {
    return res.status(400).json({ message: 'id, código y nombre cargo son requeridos' });
  }

  try {
    const result = await Cargo.update({ codigo, descripcion: nombre }, { where: { ID: id } });

    if (!result) {
      return res.status(400).json({ message: 'No se pudo actualizar el cargo' });
    }

    return res.status(200).json({ message: 'Cargo Actualizado Correctamente' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getAllTurnos = async (req: Request, res: Response) => {
  try {
    const turnos = await Turno.findAll();
    return res.status(200).json(turnos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}