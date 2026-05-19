const Producto = require('../models/Producto');
const RepuestoMotor = require('../models/RepuestoMotor');

// ESTRUCTURA DE DATOS: Colección nativa (Array) que contiene las instancias de clases POO.
// Mapea la base de datos completa de tu archivo main.js original.
const listaInventarioFisico = [
    new RepuestoMotor(1, "Amortiguadores Pro", 1250.00, "src/assets/amoritguadores.png", false),
    new RepuestoMotor(2, "Carburador Universal", 850.00, "src/assets/carburador.png", true),
    new Producto(3, "Discos de Freno", 600.00, "frenos", "src/assets/discosfrenos.png"),
    new Producto(4, "Bobina de Encendido", 450.00, "electrico", "src/assets/bobina.png"),
    new RepuestoMotor(5, "Cadena Reforzada", 550.00, "src/assets/cadena.png", false),
    new Producto(6, "Bombillos LED", 180.00, "electrico", "src/assets/bombillos.png"),
    new Producto(7, "Pastillas de Freno", 320.00, "frenos", "src/assets/pastillasfrenos.png"),
    new RepuestoMotor(8, "Kit de Cilindro", 2100.00, "src/assets/kits.png", true),
    new RepuestoMotor(9, "Bujía Iridium Pro", 250.00, "src/assets/bujia.png", false),
    new Producto(10, "Filtro de Aire Alto Flujo", 380.00, "motor", "src/assets/filtro.png"),
    new Producto(11, "Cable de Cloche Reforzado", 150.00, "suspension", "src/assets/cables.png"),
    new Producto(12, "Llanta Pistera Premium", 1850.00, "suspension", "src/assets/llanta.png"),
    new RepuestoMotor(13, "Kit de Empaques Completo", 290.00, "src/assets/empaques.png", false),
    new Producto(14, "Espejos Deportivos Carbono", 420.00, "suspension", "src/assets/espejos.png"),
    new Producto(15, "Aceite Sintético 10W40", 350.00, "motor", "src/assets/aceite.png"),
    new Producto(16, "Batería de Gel Premium", 1100.00, "electrico", "src/assets/bateria.png")
];

const obtenerProductos = (req, res) => {
    const catalogoProcesado = [];
    let punteroIteracion = 0;

    // ESTRUCTURA DE CONTROL OBLIGATORIA: Uso explícito de un bucle ciclo WHILE manual
    while (punteroIteracion < listaInventarioFisico.length) {
        const itemActual = listaInventarioFisico[punteroIteracion];
        
        // Uso de Estructuras Condicionales Lógicas (if / else)
        let disponibilidadDeStock = "Inmediata";
        if (itemActual.precio >= 1500.00) {
            disponibilidadDeStock = "Bajo Pedido Especial (24hrs)";
        }

        // Construcción de la respuesta estructurada consumiendo los métodos polimórficos de la POO
        catalogoProcesado.push({
            id: itemActual.id,
            nombre: itemActual.nombre,
            precio: itemActual.precio,
            categoria: itemActual.categoria,
            img: itemActual.img,
            descuentoMoneda: itemActual.calcularDescuentoEspecial().toFixed(2), // Aplicación de Polimorfismo
            detallesTecnicos: itemActual.obtenerFichaTecnica(),
            disponibilidad: disponibilidadDeStock
        });

        punteroIteracion++;
    }

    res.json(catalogoProcesado);
};

module.exports = { obtenerProductos };