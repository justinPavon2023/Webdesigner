// CLASE PADRE: Cumple con Programación Orientada a Objetos y Constructores
class Producto {
    constructor(id, nombre, precio, categoria, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.img = img;
    }

    // Método que será sobreescrito (Polimorfismo)
    calcularImpuesto() {
        return this.precio * 0.15; // Impuesto general del 15%
    }

    mostrarDetalles() {
        return `[${this.categoria.toUpperCase()}] ${this.nombre} - C$${this.precio}`;
    }
}

module.exports = Producto;