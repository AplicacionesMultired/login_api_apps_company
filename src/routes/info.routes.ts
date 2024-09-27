import { infoMarcaciones } from '../controllers/info.controllers';
import { Router } from 'express';

const infoRoutes = Router();

infoRoutes.get('/infoMarcacion', infoMarcaciones);
