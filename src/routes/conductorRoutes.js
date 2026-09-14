import { Router } from 'express';
import {
  getConductores,
  getConductorById,
  getConductorByCedula,
  createConductor,
  updateConductor,
  deleteConductor
} from '../controllers/conductorController.js';

const router = Router();

router.get('/', getConductores);
router.get('/:id', getConductorById);
router.get('/cedula/:cedula', getConductorByCedula);
router.post('/', createConductor);
router.put('/:id', updateConductor);
router.delete('/:id', deleteConductor);

export default router;