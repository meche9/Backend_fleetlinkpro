import { Sequelize } from 'sequelize';

// Creación de la instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'fleettransport',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '1234',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mariadb', // o 'mysql'
    logging: false
  }
);

// Exportación por defecto de la INSTANCIA
export default sequelize;