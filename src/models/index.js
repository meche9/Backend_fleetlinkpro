import Conductor from '.conductorModel.js';
import Vehiculo from '.vehiculoModel.js';

// Relación: Un Conductor tiene un Vehículo habitual asignado
Conductor.belongsTo(Vehiculo, {
  foreignKey: 'id_vehiculo_habitual',
  as: 'vehiculoHabitual'
});

// Relación inversa: Un Vehículo puede estar asignado a uno o varios conductores
Vehiculo.hasMany(Conductor, {
  foreignKey: 'id_vehiculo_habitual',
  as: 'conductores'
});

// Auto-relación de Vehículo: Un tractocamión puede tener un acoplado (remolque)
Vehiculo.belongsTo(Vehiculo, {
  foreignKey: 'id_acoplado_actual',
  as: 'acoplado'
});

export { Conductor, Vehiculo };