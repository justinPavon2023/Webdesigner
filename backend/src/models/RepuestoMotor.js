const Producto = require('./Producto');

/**
 * CLASE HIJA: Aplica el principio de HERENCIA al extender de la clase Producto
 * e introduce el principio de POLIMORFISMO mediante sobreescritura de métodos.
 */
class RepuestoMotor extends Producto {
    constructor(id, nombre, precio, img, exigeGarantiaExtendida = false) {
        // Invocación al constructor de la clase base mediante super()
        super(id, nombre, precio, 'motor', img);
        this.exigeGarantiaExtendida = exigeGarantiaExtendida;
    }

    // POLIMORFISMO: Sobreescritura completa del método de la clase padre
    calcularDescuentoEspecial() {
        if (this.exigeGarantiaExtendida) {
            return this.precio * 0.12; // 12% de descuento para componentes críticos de motor
        }
        return this.precio * 0.07; // 7% para componentes estándar de motor
    }

    obtenerFichaTecnica() {
        return `Parte interna de motor de alto rendimiento para asfalto. Garantía de fábrica verificada de forma estricta.`;
    }
}

module.exports = RepuestoMotor;