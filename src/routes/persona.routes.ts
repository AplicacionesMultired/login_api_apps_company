import { Router } from 'express';
import { getPersonas } from '../controllers/persona.controllers';

export const personaRouter = Router();

personaRouter.get('/personas', getPersonas);