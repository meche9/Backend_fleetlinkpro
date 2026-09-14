import { VehiculoService } from '../services/vehiculoService.js';

export const getVehiculos = async (req, res) => {
  try {
    const vehiculos = await VehiculoService.listarTodos();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVehiculoById = async (req, res) => {
  try {
    const vehiculo = await VehiculoService.obtenerPorId(req.params.id);
    res.json(vehiculo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getVehiculoByPlaca = async (req, res) => {
  try {
    const vehiculo = await VehiculoService.obtenerPorPlaca(req.params.placa);
    res.json(vehiculo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createVehiculo = async (req, res) => {
  try {
    const nuevoVehiculo = await VehiculoService.registrar(req.body);
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateVehiculo = async (req, res) => {
  try {
    const vehiculoActualizado = await VehiculoService.actualizar(req.params.id, req.body);
    res.json(vehiculoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteVehiculo = async (req, res) => {
  try {
    const respuesta = await VehiculoService.eliminar(req.params.id);
    res.json(respuesta);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};