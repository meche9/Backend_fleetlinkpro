import { Router } from 'express';
import { VehiculoController } from '../controllers/vehiculoController.js';

const router = Router();

router.get('/', VehiculoController.getVehiculos);
router.get('/:id', VehiculoController.getVehiculoById);
router.get('/placa/:placa', VehiculoController.getVehiculoByPlaca);
router.post('/', VehiculoController.createVehiculo);
router.put('/:id', VehiculoController.updateVehiculo);
router.delete('/:id', VehiculoController.deleteVehiculo);

export default router;