const Producto = require('./Producto');

// HERENCIA: RepuestoMotor hereda de Producto
class RepuestoMotor extends Producto {
    constructor(id, nombre, precio, img, compatibilidad) {
        // Uso de super() para el constructor padre
        super(id, nombre, precio, 'motor', img);
        this.compatibilidad = compatibilidad;
    }

    // POLIMORFISMO: Sobreescritura del método para tener un impuesto diferente
    calcularImpuesto() {
        return this.precio * 0.05; // Impuesto preferencial del 5% para repuestos de motor
    }
}

module.exports = RepuestoMotor;