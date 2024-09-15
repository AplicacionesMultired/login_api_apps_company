import { deleteArea, gellAllEmpresas, getAreas, newArea, updateArea } from '../controllers/opciones.controllers';
import { Router } from 'express';

export const opcionesRouter = Router();

opcionesRouter.get('/empresas', gellAllEmpresas);
opcionesRouter.get('/areas', getAreas);

opcionesRouter.post('/area', newArea);

opcionesRouter.put('/updatearea', updateArea);

opcionesRouter.delete('/area/:id', deleteArea);
