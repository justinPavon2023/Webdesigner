const Producto = require('../models/Producto');
const RepuestoMotor = require('../models/RepuestoMotor');

// ESTRUCTURA DE DATOS (Array de Objetos) - Tu inventario original instanciado como Clases
const inventarioBase = [
    new RepuestoMotor(1, "Amortiguadores Pro", 1250.00, "assets/amortiguadores.png", ["Yamaha", "Honda"]),
    new RepuestoMotor(2, "Carburador Universal", 850.00, "assets/carburador.png", ["Genérico"]),
    new Producto(3, "Discos de Freno", 600.00, "frenos", "assets/discosfrenos.png"),
    new Producto(4, "Bobina de Encendido", 450.00, "electrico", "assets/bobina.png")
    // Puedes agregar los demás aquí...
];

const obtenerProductos = (req, res) => {
    let productosProcesados = [];
    let i = 0;

    // USO DE BUCLE WHILE (Requisito del profesor)
    while (i < inventarioBase.length) {
        let p = inventarioBase[i];
        
        // Formateamos la respuesta usando los métodos de la POO
        productosProcesados.push({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            categoria: p.categoria,
            img: p.img,
            impuestoCalculado: p.calcularImpuesto(), // Aquí se aplica el polimorfismo
            detalle: p.mostrarDetalles()
        });
        i++;
    }

    res.json(productosProcesados);
};

module.exports = { obtenerProductos };