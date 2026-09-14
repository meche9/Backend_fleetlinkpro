import { Router } from 'express';
import {
  getVehiculos,
  getVehiculoById,
  getVehiculoByPlaca,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo
} from '../controllers/vehiculoController.js';

const router = Router();

router.get('/', getVehiculos);
router.get('/:id', getVehiculoById);
router.get('/placa/:placa', getVehiculoByPlaca);
router.post('/', createVehiculo);
router.put('/:id', updateVehiculo);
router.delete('/:id', deleteVehiculo);

export default router;