import { VehiculoModel } from '../models/vehiculoModel.js';

const ESTADOS_PERMITIDOS = ['Activo', 'En Ruta', 'Mantenimiento', 'Inactivo'];

export class VehiculoService {
  static async listarTodos() {
    return await VehiculoModel.obtenerTodos();
  }

  static async obtenerPorId(id) {
    const vehiculo = await VehiculoModel.obtenerPorId(id);
    if (!vehiculo) {
      throw new Error(`No se encontr
        ó el vehículo con ID ${id}`);
    }
    return vehiculo;
  }

  static async obtenerPorPlaca(placa) {
  const vehiculo = await VehiculoModel.obtenerPorPlaca(placa);
  if (!vehiculo) {
    throw new Error(`No se encontró ningún vehículo con la placa ${placa}`);
  }
  return vehiculo;
}

  static async registrar(datos) {
    // Validaciones de campos obligatorios según el DDL
    if (!datos.id_clasificacion || !datos.placa || !datos.marca || !datos.anio || !datos.numero_chasis) {
      throw new Error('id_clasificacion, placa, marca, anio y numero_chasis son obligatorios.');
    }

    // Validar estado ENUM
    if (datos.estado && !ESTADOS_PERMITIDOS.includes(datos.estado)) {
      throw new Error(`Estado no válido. Los estados permitidos son: ${ESTADOS_PERMITIDOS.join(', ')}`);
    }

    // Comprobar si la placa ya existe
    const existePlaca = await VehiculoModel.obtenerPorPlaca(datos.placa);
    if (existePlaca) {
      throw new Error(`La placa ${datos.placa} ya se encuentra registrada.`);
    }

    const insertId = await VehiculoModel.crear(datos);
    return await VehiculoModel.obtenerPorId(insertId);
  }

  static async actualizar(id, datos) {
    const vehiculoExistente = await VehiculoModel.obtenerPorId(id);
    if (!vehiculoExistente) {
      throw new Error(`No se encontró el vehículo con ID ${id} para actualizar.`);
    }

    if (datos.estado && !ESTADOS_PERMITIDOS.includes(datos.estado)) {
      throw new Error(`Estado no válido. Los estados permitidos son: ${ESTADOS_PERMITIDOS.join(', ')}`);
    }

    // Combinar los datos existentes con los nuevos valores recibidos
    const datosActualizados = {
      ...vehiculoExistente,
      ...datos
    };

    const actualizado = await VehiculoModel.actualizar(id, datosActualizados);
    if (!actualizado) {
      throw new Error('No se pudo realizar la actualización en la base de datos.');
    }

    return await VehiculoModel.obtenerPorId(id);
  }

  static async eliminar(id) {
    const vehiculoExistente = await VehiculoModel.obtenerPorId(id);
    if (!vehiculoExistente) {
      throw new Error(`No existe el vehículo con ID ${id} para eliminar.`);
    }

    return await VehiculoModel.eliminar(id);
  }
}