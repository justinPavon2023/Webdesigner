const express = require('express');
const cors = require('cors');
const { obtenerProductos } = require('./controllers/productoController');

const app = express();
const PORT = 3000;

app.use(cors()); // Permite que el frontend (React) se conecte al backend
app.use(express.json());

// RUTAS
app.get('/api/productos', obtenerProductos);

app.listen(PORT, () => {
    console.log(` Servidor PyW corriendo en http://localhost:${PORT}`);
});