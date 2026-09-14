import Conductor from '../models/conductorModel.js';
import Vehiculo from '../models/vehiculoModel.js';

const ESTADOS_PERMITIDOS = ['Activo', 'En Ruta', 'Vacaciones', 'Inactivo', 'Suspendido'];

export class ConductorService {
  static async obtenerTodos() {
    return await Conductor.findAll({
      include: [
        {
          model: Vehiculo,
          as: 'vehiculoHabitual',
          attributes: ['id_vehiculo', 'placa', 'marca', 'modelo']
        }
      ]
    });
  }

  static async obtenerPorId(id) {
    const conductor = await Conductor.findByPk(id, {
      include: [{ model: Vehiculo, as: 'vehiculoHabitual' }]
    });
    if (!conductor) {
      throw new Error(`No se encontró el conductor con ID ${id}`);
    }
    return conductor;
  }

  static async obtenerPorCedula(cedula) {
    const conductor = await Conductor.findOne({
      where: { cedula_identidad: cedula },
      include: [{ model: Vehiculo, as: 'vehiculoHabitual' }]
    });
    if (!conductor) {
      throw new Error(`No se encontró ningún conductor con la cédula ${cedula}`);
    }
    return conductor;
  }

  static async crear(datos) {
    // 1. Validaciones de campos obligatorios
    if (!datos.cedula_identidad || !datos.nombres || !datos.apellidos || !datos.telefono) {
      throw new Error('La cédula, nombres, apellidos y teléfono son obligatorios.');
    }

    // 2. Validar estado ENUM si se provee
    if (datos.estado && !ESTADOS_PERMITIDOS.includes(datos.estado)) {
      throw new Error(`Estado no válido. Permitidos: ${ESTADOS_PERMITIDOS.join(', ')}`);
    }

    // 3. Validar duplicados
    const existeCedula = await Conductor.findOne({ where: { cedula_identidad: datos.cedula_identidad } });
    if (existeCedula) {
      throw new Error(`La cédula ${datos.cedula_identidad} ya se encuentra registrada.`);
    }

    return await Conductor.create(datos);
  }

  static async actualizar(id, datos) {
    const conductor = await this.obtenerPorId(id);

    if (datos.estado && !ESTADOS_PERMITIDOS.includes(datos.estado)) {
      throw new Error(`Estado no válido. Permitidos: ${ESTADOS_PERMITIDOS.join(', ')}`);
    }

    return await conductor.update(datos);
  }

  static async eliminar(id) {
    const conductor = await this.obtenerPorId(id);
    await conductor.destroy();
    return { mensaje: 'Conductor eliminado correctamente' };
  }
}