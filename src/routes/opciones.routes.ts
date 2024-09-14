import { gellAllEmpresas, getAreas } from '../controllers/opciones.controllers';
import { Router } from 'express';

export const opcionesRouter = Router();

opcionesRouter.get('/empresas', gellAllEmpresas);
opcionesRouter.get('/areas', getAreas);
