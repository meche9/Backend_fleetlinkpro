import { ConductorService } from '../services/conductorService.js';

export const getConductores = async (req, res) => {
  try {
    const conductores = await ConductorService.obtenerTodos();
    res.json(conductores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConductorById = async (req, res) => {
  try {
    const conductor = await ConductorService.obtenerPorId(req.params.id);
    res.json(conductor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getConductorByCedula = async (req, res) => {
  try {
    const conductor = await ConductorService.obtenerPorCedula(req.params.cedula);
    res.json(conductor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createConductor = async (req, res) => {
  try {
    const nuevoConductor = await ConductorService.crear(req.body);
    res.status(201).json(nuevoConductor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateConductor = async (req, res) => {
  try {
    const conductorActualizado = await ConductorService.actualizar(req.params.id, req.body);
    res.json(conductorActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteConductor = async (req, res) => {
  try {
    const respuesta = await ConductorService.eliminar(req.params.id);
    res.json(respuesta);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};