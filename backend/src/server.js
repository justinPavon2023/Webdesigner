const express = require('express');
const cors = require('cors');
const { obtenerProductos } = require('./controllers/productoController');

const app = express();
const PUERTO_API = 3000;

// Configuración de Middlewares globales
app.use(cors()); // Habilita la comunicación cruzada con el servidor de Vite de React
app.use(express.json());

// Declaración formal de Endpoints del Negocio
app.get('/api/productos', obtenerProductos);

app.listen(PUERTO_API, () => {
    console.log(`  API REST de PyW Motorepuestos desplegada de forma correcta en http://localhost:${PUERTO_API}`);
});