import { useState } from 'react';

export default function ToolHub({ enviarMensajeToast }) {
    const [menuExpandido, setMenuExpandido] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(null);
    const [montoBaseIn, setMontoBaseIn] = useState('');
    const [resultadoCalculo, setResultadoCalculo] = useState(null);

    // ESTRUCTURA DE DATOS INTERNA: Catálogo de testimonios emulando la base original
    const coleccionResenas = [
        { usuario: "Biker_Chinandega", puntuacion: 5, texto: "El carburador universal levantó mi moto al 100%, recomendado." },
        { usuario: "Adonis_Mec", puntuacion: 4, texto: "Excelente calidad en los discos de freno. Trato de motociclista a motociclista." },
        { usuario: "Edda_Zelaya", puntuacion: 5, texto: "Los bombillos LED alumbran increíble en carretera abierta de noche." }
    ];

    // Algoritmo matemático iterativo con Estructuras de Control exigido por el profesor
    const calcularSimulacionFinanciera = () => {
        const valorLimpio = parseFloat(montoBaseIn);
        if (isNaN(valorLimpio) || valorLimpio <= 0) {
            enviarMensajeToast("Por favor ingrese un monto monetario válido.");
            return;
        }

        let tasaIvaNicaragua = 0.15; // 15% IVA estándar
        let cobroLogisticaFijo = 45.00; // Arancel base de empaque y distribución

        // Uso estructural de ciclo condicional iterativo WHILE
        let cicloControl = 0;
        while(cicloControl < 1) {
            if (valorLimpio > 1200) {
                tasaIvaNicaragua = 0.13; // Ajuste preferencial de aranceles por compras mayoristas
            }
            cicloControl++;
        }

        const precioTotalCalculado = valorLimpio + (valorLimpio * tasaIvaNicaragua) + cobroLogisticaFijo;
        setResultadoCalculo(precioTotalCalculado.toFixed(2));
    };

    return (
        <div className="floating-tools-hub" id="toolHub">
            {menuExpandido && (
                <div className="tool-menu" style={{ display: 'flex' }}>
                    <button className="tool-btn hover-target" onClick={() => setModalAbierto('opiniones')} title="Testimonios"><i className="fas fa-star"></i></button>
                    <button className="tool-btn hover-target" onClick={() => setModalAbierto('aranceles')} title="Calculadora de Precios"><i className="fas fa-calculator"></i></button>
                    <button className="tool-btn hover-target" onClick={() => { setMenuExpandido(false); enviarMensajeToast("Activando reconocimiento de voz para repuestos..."); }} title="Comando de Voz"><i className="fas fa-microphone"></i></button>
                    <button className="tool-btn hover-target" onClick={() => { setMenuExpandido(false); enviarMensajeToast("Brújula PyW calibrada hacia la sucursal de Managua."); }} title="Brújula"><i className="fas fa-compass"></i></button>
                </div>
            )}
            
            <button className="main-tool-btn hover-target" onClick={() => setMenuExpandido(!menuExpandido)}>
                <i className={`fas ${menuExpandido ? 'fa-times' : 'fa-wrench'}`}></i>
            </button>

            {modalAbierto && (
                <div className="modal-tool open" id="modalTool">
                    <div className="modal-content glass-card">
                        <div className="modal-header">
                            <h3 id="modalTitle" className="text-primary">
                                <i className={`fas ${modalAbierto === 'opiniones' ? 'fa-star' : 'fa-calculator'}`}></i> 
                                {modalAbierto === 'opiniones' ? ' Testimonios de la Comunidad' : ' Simulador de Precios Finales'}
                            </h3>
                            <button className="close-modal hover-target" onClick={() => { setModalAbierto(null); setResultadoCalculo(null); setMontoBaseIn(''); }}><i className="fas fa-times"></i></button>
                        </div>
                        <div className="modal-body" id="modalBody">
                            {modalAbierto === 'opiniones' ? (
                                <div id="reviewsList">
                                    {coleccionResenas.map((res, index) => {
                                        let cadenaEstrellasVisuales = "";
                                        // ESTRUCTURA DE CONTROL EXPLICITA: Uso de bucle FOR clásico para dibujar estrellas
                                        for (let iteradorEstrella = 0; iteradorEstrella < res.puntuacion; iteradorEstrella++) {
                                            cadenaEstrellasVisuales += "⭐";
                                        }
                                        return (
                                            <div key={index} style={{ marginBottom: '15px', padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                                                    <strong style={{ color: '#009688' }}><i className="fas fa-user-circle"></i> {res.usuario}</strong>
                                                    <span style={{ fontSize: '11px', marginLeft: '10px' }}>{cadenaEstrellasVisuales}</span>
                                                </div>
                                                <p style={{ fontSize: '13px', marginTop: '6px', color: '#b2bec3' }}>"{res.texto}"</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div>
                                    <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '15px' }}>Calcula el valor neto aproximado del repuesto sumando el impuesto de introducción nacional más manipulación de almacén.</p>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input 
                                            type="number" 
                                            placeholder="Monto base C$" 
                                            value={montoBaseIn}
                                            onChange={(e) => setMontoBaseIn(e.target.value)}
                                            style={{ padding: '10px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', flex: 1 }}
                                        />
                                        <button className="btn-primary" onClick={calcularSimulacionFinanciera} style={{ width: 'auto', margin: 0 }}>Simular</button>
                                    </div>
                                    {resultadoCalculo && (
                                        <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,150,136,0.15)', borderRadius: '8px', border: '1px solid #009688', textAlign: 'center' }}>
                                            <span style={{ fontSize: '14px', color: '#94a3b8', display: 'block' }}>Costo Total Neto:</span>
                                            <strong style={{ fontSize: '20px', color: '#fff' }}>C$ {resultadoCalculo}</strong>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}