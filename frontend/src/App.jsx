import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]); // Estructura de datos para el estado
  const [filtro, setFiltro] = useState('todos');

  // Conexión al Backend
  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, { ...producto, cantidad: 1 }]);
  };

  // USO DE BUCLE FOR y CONDICIONALES (Requisito del profesor)
  const calcularTotal = () => {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].precio > 0) { // Uso de if
        total += carrito[i].precio * carrito[i].cantidad;
      }
    }
    return total;
  };

  return (
    <div data-theme="dark">
      {/* NAVBAR BÁSICO */}
      <nav className="navbar scrolled">
        <div className="logo"><i className="fas fa-motorcycle"></i> PyW</div>
        <div className="nav-actions">
          <button className="btn-cart">
            <i className="fas fa-shopping-cart"></i> 
            <span className="badge pop-anim">{carrito.length}</span>
          </button>
        </div>
      </nav>

      {/* CATÁLOGO */}
      <section className="container section-padding mt-4">
        <div className="text-center">
          <h2 className="section-title mt-4">Inventario Premium (Desde Node.js)</h2>
          <div className="title-line"></div>
        </div>

        <div className="grid-4 mt-4">
          {productos.map(prod => (
            <div key={prod.id} className="card-producto">
              <h4>{prod.nombre}</h4>
              <p className="text-muted">{prod.categoria}</p>
              <h3 className="text-primary mt-2">C$ {prod.precio.toFixed(2)}</h3>
              <p style={{fontSize: '12px'}}>Impuesto aplicable: C${prod.impuestoCalculado}</p>
              
              <button 
                className="btn-primary w-100 mt-4"
                onClick={() => agregarAlCarrito(prod)}
              >
                <i className="fas fa-cart-plus"></i> Agregar
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;