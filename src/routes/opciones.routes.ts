import { deleteArea, gellAllEmpresas, getAllCargos, getAreas, newArea, updateArea, deleteCargo, newCargo, updateCargo, getAllTurnos } from '../controllers/opciones.controllers';
import { Router } from 'express';

export const opcionesRouter = Router();

opcionesRouter.get('/empresas', gellAllEmpresas);

opcionesRouter.get('/areas', getAreas);
opcionesRouter.post('/area', newArea);
opcionesRouter.put('/updatearea', updateArea);
opcionesRouter.delete('/area/:id', deleteArea);

opcionesRouter.get('/cargos', getAllCargos);
opcionesRouter.post('/cargo', newCargo);
opcionesRouter.put('/updatecargo', updateCargo);
opcionesRouter.delete('/cargo/:id', deleteCargo);

opcionesRouter.get('/turnos', getAllTurnos);