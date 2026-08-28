import { VehiculoService } from '../services/vehiculoService.js';

export class VehiculoController {
  static async getVehiculos(req, res) {
    try {
      const vehiculos = await VehiculoService.listarTodos();
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getVehiculoById(req, res) {
    try {
      const vehiculo = await VehiculoService.obtenerPorId(req.params.id);
      res.json(vehiculo);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getVehiculoByPlaca(req, res) {
  try {
    const vehiculo = await VehiculoService.obtenerPorPlaca(req.params.placa);
    res.json(vehiculo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

  static async createVehiculo(req, res) {
    try {
      const nuevoVehiculo = await VehiculoService.registrar(req.body);
      res.status(201).json(nuevoVehiculo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateVehiculo(req, res) {
    try {
      const vehiculoActualizado = await VehiculoService.actualizar(req.params.id, req.body);
      res.json(vehiculoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteVehiculo(req, res) {
    try {
      await VehiculoService.eliminar(req.params.id);
      res.json({ mensaje: `El vehículo con ID ${req.params.id} fue eliminado correctamente.` });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}