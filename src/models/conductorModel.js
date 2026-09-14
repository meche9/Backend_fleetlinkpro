import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const Conductor = sequelize.define('Conductor', {
  id_conductor: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  cedula_identidad: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: 'DNI / Cédula / NIF / Pasaporte'
  },
  nombres: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null
  },
  sexo: {
    type: DataTypes.ENUM('M', 'F', 'Otro'),
    allowNull: true,
    defaultValue: null
  },
  nacionalidad: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null
  },
  estado_civil: {
    type: DataTypes.ENUM('Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Concubinato'),
    allowNull: true,
    defaultValue: null
  },
  carga_familiar: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: 0,
    comment: 'Número de personas a cargo'
  },
  tipo_sangre: {
    type: DataTypes.STRING(5),
    allowNull: true,
    defaultValue: null,
    comment: 'Ej: A+, O-, etc.'
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: 'Nro. de teléfono principal'
  },
  telefono_auxiliar: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null,
    comment: 'Nro. de teléfono secundario'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    comment: 'Dirección general / Referencia'
  },
  urb_barrio_parroquia: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  av_calle: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  edif_casa: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  apto_piso: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null
  },
  estado_ciudad_municipio: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: null
  },
  persona_contacto: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    comment: 'Nombre de persona de emergencia'
  },
  telefono_contacto: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null,
    comment: 'Teléfono de persona de emergencia'
  },
  talla_camisa: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: null
  },
  talla_pantalon: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: null
  },
  talla_chemise: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: null
  },
  talla_franela: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: null
  },
  talla_calzado: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: null
  },
  banco: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  nro_cuenta: {
    type: DataTypes.STRING(30),
    allowNull: true,
    defaultValue: null,
    comment: 'Número de cuenta bancaria'
  },
  pago_movil: {
    type: DataTypes.STRING(30),
    allowNull: true,
    defaultValue: null,
    comment: 'Teléfono o RIF/Cédula asociado a Pago Móvil'
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'En Ruta', 'Vacaciones', 'Inactivo', 'Suspendido'),
    allowNull: true,
    defaultValue: 'Activo'
  },
  id_vehiculo_habitual: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    defaultValue: null,
    comment: 'ID de la unidad motriz asignada habitualmente',
    references: {
      model: 'vehiculos',
      key: 'id_vehiculo'
    }
  }
}, {
  tableName: 'conductores',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

export default Conductor;