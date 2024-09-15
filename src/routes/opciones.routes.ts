import { gellAllEmpresas, getAreas, newArea } from '../controllers/opciones.controllers';
import { Router } from 'express';

export const opcionesRouter = Router();

opcionesRouter.get('/empresas', gellAllEmpresas);
opcionesRouter.get('/areas', getAreas);
opcionesRouter.post('/area', newArea);
