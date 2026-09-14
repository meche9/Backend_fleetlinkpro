import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Vehiculo = sequelize.define('Vehiculo', {
  id_vehiculo: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  id_clasificacion: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    comment: 'Llave foránea a clasificaciones_vehiculos',
    references: {
      model: 'clasificaciones_vehiculos',
      key: 'id_clasificacion'
    }
  },
  placa: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null
  },
  anio: {
    type: DataTypes.INTEGER(4),
    allowNull: false
  },
  numero_chasis: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  numero_motor: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null,
    unique: true,
    comment: 'Será NULL para los remolques'
  },
  capacidad_carga: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
    comment: '(Segun Paletas) Útil para remolques o camiones rígidos'
  },
  capacidad_arrastre: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
    comment: '(Segun Peso) Útil para tractocamiones'
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'En Ruta', 'Mantenimiento', 'Inactivo'),
    allowNull: true,
    defaultValue: 'Activo'
  },
  id_acoplado_actual: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
    comment: 'ID del remolque enganchado actualmente',
    references: {
      model: 'vehiculos',
      key: 'id_vehiculo'
    }
  }
}, {
  tableName: 'vehiculos',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

export default Vehiculo;