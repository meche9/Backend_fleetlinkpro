import Vehiculo from '../models/vehiculoModel.js';

const ESTADOS_PERMITIDOS = ['Activo', 'En Ruta', 'Mantenimiento', 'Inactivo'];

export class VehiculoService {
  static async listarTodos() {
    return await Vehiculo.findAll({
      include: [
        {
          model: Vehiculo,
          as: 'acopladoActual',
          attributes: ['id_vehiculo', 'placa', 'marca', 'modelo']
        }
      ]
    });
  }

  static async obtenerPorId(id) {
    const vehiculo = await Vehiculo.findByPk(id, {
      include: [
        {
          model: Vehiculo,
          as: 'acopladoActual'
        }
      ]
    });

    if (!vehiculo) {
      throw new Error(`No se encontró el vehículo con ID ${id}`);
    }

    return vehiculo;
  }

  static async obtenerPorPlaca(placa) {
    const vehiculo = await Vehiculo.findOne({
      where: { placa },
      include: [
        {
          model: Vehiculo,
          as: 'acopladoActual'
        }
      ]
    });

    if (!vehiculo) {
      throw new Error(`No se encontró ningún vehículo con la placa ${placa}`);
    }

    return vehiculo;
  }

  static async registrar(datos) {
    // 1. Validaciones de campos obligatorios
    if (!datos.id_clasificacion || !datos.placa || !datos.marca || !datos.anio || !datos.numero_chasis) {
      throw new Error('id_clasificacion, placa, marca, anio y numero_chasis son obligatorios.');
    }

    // 2. Validar estado ENUM
    if (datos.estado && !ESTADOS_PERMITIDOS.includes(datos.estado)) {
      throw new Error(`Estado no válido. Los estados permitidos son: ${ESTADOS_PERMITIDOS.join(', ')}`);
    }

    // 3. Comprobar si la placa ya existe
    const existePlaca = await Vehiculo.findOne({ where: { placa: datos.placa } });
    if (existePlaca) {
      throw new Error(`La placa ${datos.placa} ya se encuentra registrada.`);
    }

    return await Vehiculo.create(datos);
  }

  static async actualizar(id, datos) {
    // Reutiliza la validación de existencia de obtenerPorId
    const vehiculo = await this.obtenerPorId(id);

    if (datos.estado && !ESTADOS_PERMITIDOS.includes(datos.estado)) {
      throw new Error(`Estado no válido. Los estados permitidos son: ${ESTADOS_PERMITIDOS.join(', ')}`);
    }

    return await vehiculo.update(datos);
  }

  static async eliminar(id) {
    const vehiculo = await this.obtenerPorId(id);
    await vehiculo.destroy();
    return { mensaje: 'Vehículo eliminado correctamente' };
  }
}