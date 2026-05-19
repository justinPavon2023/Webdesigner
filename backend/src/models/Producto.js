/**
 * CLASE PADRE: Representa el modelo base de los repuestos.
 * Cumple con los requisitos de POO, encapsulamiento y constructores.
 */
class Producto {
    constructor(id, nombre, precio, categoria, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.img = img;
    }

    // Método base diseñado para demostrar Polimorfismo
    calcularDescuentoEspecial() {
        return this.precio * 0.02; // Descuento base general del 2%
    }

    obtenerFichaTecnica() {
        return `Componente Premium para optimización de sistemas en motocicletas. Categoría: ${this.categoria.toUpperCase()}.`;
    }
}

module.exports = Producto;