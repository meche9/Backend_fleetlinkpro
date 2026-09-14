import express from 'express';
import 'dotenv/config';

// Importación de rutas (Recuerda incluir siempre la extensión .js)
import conductorRoutes from './src/routes/conductorRoutes.js';
import vehiculoRoutes from './src/routes/vehiculoRoutes.js';


const app = express();

// 1. Middlewares globales
app.use(express.json()); // Permite a la API recibir datos en formato JSON

// 2. Ruta raíz de verificación de estado (Health Check)
app.get('/', (req, res) => {
  res.json({ 
    sistema: 'API Control de Flotas',
    estado: 'En línea',
    fecha: new Date().toISOString()
  });
});

// 3. Registro de las rutas de los módulos
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/conductores', conductorRoutes);

// 4. Captura de rutas inexistentes (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// 5. Inicialización del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en: http://localhost:${PORT}`);
});