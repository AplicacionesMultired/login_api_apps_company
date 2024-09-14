import { getPersonas } from '../controllers/persona.controllers';
import { Router } from 'express';

export const personaRouter = Router();

personaRouter.get('/personas', getPersonas);