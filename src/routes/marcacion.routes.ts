import { getMarcaciones } from '../controllers/marcacion.controllers';
import { Router } from "express";

export const marcacionRouter = Router();

marcacionRouter.get('/marcaciones', getMarcaciones);