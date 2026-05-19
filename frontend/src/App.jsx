import { useState, useEffect } from 'react';
import ToolHub from './components/ToolHub';
import './index.css'; // Mapea todos tus estilos CSS originales adaptados

export default function App() {
  // CONFIGURACIÓN DE ESTADOS REACTIVOS (Estructuras de Datos dinámicas)
  const [inventarioApi, setInventarioApi] = useState([]);
  const [carritoDeCompras, setCarritoDeCompras] = useState([]);
  const [preloaderActivo, setPreloaderActivo] = useState(true);
  const [sidebarCarritoAbierto, setSidebarCarritoAbierto] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [busquedaInput, setBusquedaInput] = useState('');
  const [pestañaActiva, setPestañaActiva] = useState('tab-eficiencia');
  const [notificacionToast, setNotificacionToast] = useState(null);
  const [textoTypewriter, setTextoTypewriter] = useState('');
  const [posicionMouse, setPosicionMouse] = useState({ x: 0, y: 0 });

  // Sincronización del puntero personalizado líquido líquido
  useEffect(() => {
    const actualizarCoordenadasMouse = (evento) => {
      setPosicionMouse({ x: evento.clientX, y: evento.clientY });
    };
    window.addEventListener('mousemove', actualizarCoordenadasMouse);
    return () => window.removeEventListener('mousemove', actualizarCoordenadasMouse);
  }, []);

  // Efecto Typewriter del Hero
  useEffect(() => {
    const frasesFraseo = ["Alto Rendimiento", "Calidad Garantizada", "Pasión Por El Motor"];
    let indiceFrase = 0;
    let indiceLetra = 0;
    let borrando = false;
    let temporizadorMecanografia;

    const procesarEfectoLetras = () => {
      const fraseActual = frasesFraseo[indiceFrase];
      if (!borrando) {
        setTextoTypewriter(fraseActual.substring(0, indiceLetra + 1));
        indiceLetra++;
        if (indiceLetra === fraseActual.length) {
          borrando = true;
          temporizadorMecanografia = setTimeout(procesarEfectoLetras, 2000); // Pausa al completar palabra
          return;
        }
      } else {
        setTextoTypewriter(fraseActual.substring(0, indiceLetra - 1));
        indiceLetra--;
        if (indiceLetra === 0) {
          borrando = false;
          indiceFrase = (indiceFrase + 1) % frasesFraseo.length;
        }
      }
      temporizadorMecanografia = setTimeout(procesarEfectoLetras, borrando ? 60 : 120);
    };

    procesarEfectoLetras();
    return () => clearTimeout(temporizadorMecanografia);
  }, []);

  // Consumo asíncronos desde el Servidor Express de Node.js
  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => {
        setInventarioApi(data);
        // Retardo controlado para emular la barra de carga original del Preloader
        setTimeout(() => setPreloaderActivo(false), 1200);
      })
      .catch(error => {
        console.error("Fallo de comunicación con la API REST:", error);
        setPreloaderActivo(false);
      });
  }, []);

  const lanzarNotificacionToast = (mensaje) => {
    setNotificacionToast(mensaje);
    setTimeout(() => setNotificacionToast(null), 3500);
  };

  const agregarFilaCarrito = (item) => {
    setCarritoDeCompras([...carritoDeCompras, item]);
    lanzarNotificacionToast(`¡${item.nombre} agregado al pedido con éxito!`);
  };

  const removerFilaCarrito = (indiceRemover) => {
    const carritoModificado = carritoDeCompras.filter((_, idx) => idx !== indiceRemover);
    setCarritoDeCompras(carritoModificado);
  };

  // ESTRUCTURA DE CONTROL EXPLICITA: Ciclo FOR tradicional indexado exigido para evaluar el carrito
  const calcularTotalEfectivoCarrito = () => {
    let acumuladorSuma = 0;
    for (let i = 0; i < carritoDeCompras.length; i++) {
      if (carritoDeCompras[i].precio > 0) {
        acumuladorSuma += carritoDeCompras[i].precio;
      }
    }
    return acumuladorSuma.toFixed(2);
  };

  // Enrutamiento del API de Checkout hacia WhatsApp de tu código original
  const ejecutarDespachoWhatsApp = () => {
    if (carritoDeCompras.length === 0) return;
    let mensajeFormateado = "🏍️ *NUEVO PEDIDO - PYW MOTOREPUESTOS* 🏍️\n\n";
    
    for (let k = 0; k < carritoDeCompras.length; k++) {
      mensajeFormateado += `• ${carritoDeCompras[k].nombre} - C$ ${carritoDeCompras[k].precio}\n`;
    }
    mensajeFormateado += `\n*TOTAL NETO:* C$ ${calcularTotalEfectivoCarrito()}\n\n_Por favor confirmar disponibilidad de stock._`;
    
    const uriCodificada = encodeURIComponent(mensajeFormateado);
    window.open(`https://api.whatsapp.com/send?phone=50581023737&text=${uriCodificada}`, '_blank');
    
    // Disparo de animación Confetti de éxito si está disponible globalmente
    if (window.confetti) window.confetti();
  };

  // Algoritmo de filtrado doble en cruz (Inputs de texto + botones de categoría)
  const productosFiltrados = inventarioApi.filter(p => {
    const coincideFiltroBoton = categoriaFiltro === 'todos' || p.categoria === categoriaFiltro;
    const coincideBuscador = p.nombre.toLowerCase().includes(busquedaInput.toLowerCase());
    return coincideFiltroBoton && coincideBuscador;
  });

  return (
    <div data-theme="dark">
      {/* 1. PRELOADER INTEGRAL ORIGINAL */}
      {preloaderActivo && (
        <div id="preloader" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="loader-bar" style={{ width: '100%', transition: 'width 1.2s ease-in-out' }}></div>
          <h3 style={{ color: '#009688', marginTop: '20px', fontFamily: 'Poppins' }}>Iniciando Sistemas MotoRepuestos...</h3>
        </div>
      )}

      {/* Cursores líquidos reactivos */}
      <div className="cursor-dot" style={{ left: `${posicionMouse.x}px`, top: `${posicionMouse.y}px` }} />
      <div className="cursor-ring" style={{ left: `${posicionMouse.x}px`, top: `${posicionMouse.y}px` }} />

      {/* 2. NAVBAR REPLICADO */}
      <nav className="navbar" id="navbar">
        <a href="#inicio" className="logo hover-target">
          <span>PyW <span>Motorepuestos</span></span>
        </a>
        <div className="nav-links">
          <a href="#inicio" className="hover-target">Inicio</a>
          <a href="#servicios" className="hover-target">Servicios</a>
          <a href="#nosotros" className="hover-target">Nosotros</a>
          <a href="#catalogo" className="hover-target">Catálogo</a>
        </div>
        <div className="nav-actions">
          <button className="btn-cart hover-target" onClick={() => setSidebarCarritoAbierto(true)}>
            <i className="fas fa-shopping-cart"></i> 
            <span id="cart-count" className="badge pop-anim">{carritoDeCompras.length}</span>
          </button>
        </div>
      </nav>

      {/* 3. SIDEBAR DE COMPRAS FLOTANTE */}
      {sidebarCarritoAbierto && <div id="overlay-carrito" style={{ display: 'block' }} onClick={() => setSidebarCarritoAbierto(false)} />}
      <div id="sidebarCarrito" className={`sidebar-carrito ${sidebarCarritoAbierto ? 'open' : ''}`}>
        <div className="carrito-header">
          <h3><i className="fas fa-motorcycle"></i> Tu Pedido</h3>
          <button id="btnCerrarCarrito" className="hover-target" onClick={() => setSidebarCarritoAbierto(false)}><i className="fas fa-times"></i></button>
        </div>
        <div className="carrito-body" id="lista-carrito">
          {carritoDeCompras.length === 0 ? (
            <div className="carrito-vacio">
              <i className="fas fa-box-open floating-anim"></i>
              <p>Aún no hay repuestos en tu carrito.</p>
            </div>
          ) : (
            carritoDeCompras.map((c, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <h5 style={{ margin: 0, color: '#fff' }}>{c.nombre}</h5>
                  <small style={{ color: '#009688' }}>C$ {c.precio.toFixed(2)}</small>
                </div>
                <button onClick={() => removerFilaCarrito(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><i className="fas fa-trash-alt"></i></button>
              </div>
            ))
          )}
        </div>
        <div className="carrito-footer">
          <div className="total-compra">Total: <span id="total-precio">C$ {calcularTotalEfectivoCarrito()}</span></div>
          <button className="btn-checkout btn-primary w-100 hover-target" onClick={ejecutarDespachoWhatsApp} disabled={carritoDeCompras.length === 0}>
            Enviar por WhatsApp <i className="fab fa-whatsapp"></i>
          </button>
        </div>
      </div>

      {/* 4. HERO SECTION CON VIDEO COMPLETO */}
      <header id="inicio" className="hero section-scroll">
        <div className="hero-video-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}>
          <div style={{ width: '100%', height: '100%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Animación fluida fallback en caso de retraso de video */}
            <span style={{ color: 'rgba(255,255,255,0.03)', fontSize: '9vw', fontWeight: 800 }}>MOTO ENGINE</span>
          </div>
        </div>
        <div className="hero-overlay"></div> 
        <div className="hero-content">
          <h1 className="reveal-text-box"><span className="reveal-text">Revoluciona</span></h1>
          <h1 className="reveal-text-box text-primary">
            <span>{textoTypewriter}</span><span className="cursor-blink">|</span>
          </h1>
          <p className="fade-up-scroll delay-1 text-white-always">Componentes originales y de alto rendimiento. Todo lo que necesitas para dominar el asfalto nicaragüense.</p>
          <div className="hero-botones fade-up-scroll delay-2" style={{ marginTop: '25px' }}>
            <a href="#catalogo" className="btn-primary hover-target">Ver Catálogo <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </header>

      {/* 5. SECCIÓN SERVICIOS */}
      <section id="servicios" className="container section-padding section-scroll">
        <div className="text-center">
          <h2 className="section-title">¿Qué Ofertamos?</h2>
          <div className="title-line"></div>
          <p className="pyw-intro-text mt-4">Soluciones integrales para que tu motocicleta nunca deje de rodar.</p>
        </div>
        <div className="pyw-grid mt-4">
          <div className="pyw-card-3d module-card hover-target">
            <div className="pyw-icon-wrapper"><i className="fas fa-cogs"></i></div>
            <h3>Amplio Inventario</h3>
            <p>Desde partes internas de motor hasta sistemas eléctricos completos de alta gama.</p>
          </div>
          <div className="pyw-card-3d module-card hover-target">
            <div className="pyw-icon-wrapper"><i className="fas fa-tools"></i></div>
            <h3>Asesoría Mecánica</h3>
            <p>Nuestro equipo en el Barrio Costa Rica te asiste para identificar la pieza exacta de tu moto.</p>
          </div>
          <div className="pyw-card-3d module-card hover-target">
            <div className="pyw-icon-wrapper"><i className="fas fa-motorcycle"></i></div>
            <h3>Accesorios y Lujos</h3>
            <p>Personaliza tu vehículo con iluminación LED de alta potencia, defensas y cascos certificados.</p>
          </div>
        </div>
      </section>

      {/* 6. SECCIÓN MISION / VISION CON CONTROL DE PESTAÑAS REACTIVAS */}
      <section id="nosotros" className="container section-padding section-scroll">
        <div className="text-center">
          <h2 className="section-title">Nuestra Esencia</h2>
          <div className="title-line"></div>
        </div>
        <div className="pyw-mvv-grid mt-4">
          <div className="pyw-mvv-card hover-target">
            <i className="fas fa-bullseye"></i>
            <h3>Misión</h3>
            <p>Proveer componentes de alta calidad asegurando el máximo rendimiento y seguridad para todos los motociclistas.</p>
          </div>
          <div className="pyw-mvv-card hover-target">
            <i className="fas fa-eye"></i>
            <h3>Visión</h3>
            <p>Ser el distribuidor líder de repuestos a nivel nacional, destacando por nuestra innovación, inventario y confiabilidad.</p>
          </div>
        </div>

        {/* TABS COMPLETO */}
        <div className="pyw-tabs-container mt-4">
          <div className="pyw-tab-buttons">
            <button className={`pyw-tab-btn hover-target ${pestañaActiva === 'tab-eficiencia' ? 'active' : ''}`} onClick={() => setPestañaActiva('tab-eficiencia')}><i className="fas fa-bolt mr-2"></i> Eficiencia</button>
            <button className={`pyw-tab-btn hover-target ${pestañaActiva === 'tab-seguridad' ? 'active' : ''}`} onClick={() => setPestañaActiva('tab-seguridad')}><i className="fas fa-shield-alt mr-2"></i> Seguridad</button>
            <button className={`pyw-tab-btn hover-target ${pestañaActiva === 'tab-calidad' ? 'active' : ''}`} onClick={() => setPestañaActiva('tab-calidad')}><i className="fas fa-medal mr-2"></i> Calidad</button>
          </div>
          <div className="pyw-tabs-content-wrapper" style={{ padding: '20px', background: 'var(--surface-color)', borderRadius: '0 0 12px 12px' }}>
            {pestañaActiva === 'tab-eficiencia' && (
              <div className="pyw-tab-content active">
                <i className="fas fa-tachometer-alt big-icon text-primary"></i>
                <h4>Despacho Inmediato</h4>
                <p>Sabemos que tu tiempo vale oro. Contamos con un sistema de búsqueda optimizado desde Node.js que reduce los tiempos de espera en almacén.</p>
              </div>
            )}
            {pestañaActiva === 'tab-seguridad' && (
              <div className="pyw-tab-content active">
                <i className="fas fa-lock big-icon text-primary"></i>
                <h4>Garantía de Fábrica Estricta</h4>
                <p>Todas las piezas cumplen controles de resistencia rigurosos. Tu seguridad física en carretera es nuestra prioridad absoluta.</p>
              </div>
            )}
            {pestañaActiva === 'tab-calidad' && (
              <div className="pyw-tab-content active">
                <i className="fas fa-medal big-icon text-primary"></i>
                <h4>Inversión Inteligente</h4>
                <p>No arriesgues tu dinero. Aquí encontrarás componentes certificados de alta durabilidad estructural para maximizar tu kilometraje.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. CATÁLOGO COMPLETO CON BUSCADOR Y FILTROS INTEGRADOS */}
      <section id="catalogo" className="container section-padding section-scroll">
        <div className="text-center">
          <h2 className="section-title">Inventario Premium</h2>
          <div className="title-line"></div>
          
          <div className="catalog-controls mt-4">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Buscar bobinas, frenos, carburadores..." 
                value={busquedaInput}
                onChange={(e) => setBusquedaInput(e.target.value)}
                className="hover-target"
              />
            </div>
            <div className="filtros-categoria" id="filtrosCatalogo">
              {['todos', 'motor', 'electrico', 'frenos', 'suspension'].map(cat => (
                <button 
                  key={cat}
                  className={`btn-filtro hover-target ${categoriaFiltro === cat ? 'active' : ''}`}
                  onClick={() => setCategoriaFiltro(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-4 mt-4" id="gridProductos" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
          {productosFiltrados.map(prod => (
            <div key={prod.id} className="card-producto">
              <span style={{ fontSize: '11px', background: 'rgba(0,150,136,0.15)', color: '#009688', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '10px' }}>
                <i className="fas fa-check-circle"></i> {prod.disponibilidad}
              </span>
              <h3 style={{ fontSize: '18px', color: '#fff', margin: '5px 0' }}>{prod.nombre}</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '8px 0', lineHeight: '1.4' }}>{prod.detallesTecnicos}</p>
              <h2 className="text-primary" style={{ margin: '12px 0' }}>C$ {prod.precio.toFixed(2)}</h2>
              <small style={{ display: 'block', color: '#636e72', marginBottom: '15px' }}>Descuento aplicable: -C$ {prod.descuentoMoneda}</small>
              <button className="btn-primary hover-target" onClick={() => agregarFilaCarrito(prod)}>
                <i className="fas fa-cart-plus"></i> Añadir Al Pedido
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="footer section-padding pb-0 section-scroll" style={{ background: '#0b0f19', padding: '40px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container text-center">
          <h3 className="text-primary" style={{ fontSize: '22px', marginBottom: '5px' }}>PyW Motorepuestos</h3>
          <p className="text-muted" style={{ fontSize: '13px' }}>Managua, Barrio Costa Rica. De la Gasolinera 2c abajo.</p>
          <p style={{ fontSize: '12px', color: '#555', marginTop: '15px' }}>&copy; 2026 Todos los derechos reservados. Ingeniería de Sistemas.</p>
        </div>
      </footer>

      {/* COMPONENTE MODULAR DEL HUB DE HERRAMIENTAS FLOTANTES */}
      <ToolHub enviarMensajeToast={lanzarNotificacionToast} />

      {/* COMPONENTE MAESTRO TOAST PARA NOTIFICACIONES DEL SISTEMA */}
      {notificacionToast && (
        <div className="toast" id="toast-container" style={{ display: 'flex', bottom: '30px', left: '30px', position: 'fixed' }}>
          <i className="fas fa-info-circle" style={{ color: '#009688', marginRight: '10px' }}></i>
          <span>{notificacionToast}</span>
        </div>
      )}
    </div>
  );
}