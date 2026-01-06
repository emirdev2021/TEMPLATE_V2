// =========================================
// VARIABLES GLOBALES
// =========================================
let carrito = [];
let productoSeleccionadoTemp = null; // Aquí guardamos el producto mientras el usuario elige opciones

// =========================================
// 1. INICIALIZACIÓN
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarEncabezado();
    renderizarMenu();
    actualizarBadge();
});

// =========================================
// 2. RENDERIZADO (PINTAR EN PANTALLA)
// =========================================
function renderizarEncabezado() {
    // Si agregaste descripcion en data.js, puedes descomentar la linea de abajo
    document.getElementById('nombre-local').innerText = CONFIG.nombre;
    if(CONFIG.descripcion) {
        // Asegurate de tener el <p id="desc-local"> en tu HTML si usas esto
        const descEl = document.getElementById('desc-local');
        if(descEl) descEl.innerText = CONFIG.descripcion;
    }
}

function renderizarMenu() {
    const contenedor = document.getElementById('menu-container');
    let html = '';

    MENU.forEach(categoria => {
        // Título de Categoría
        html += `
            <div class="mb-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <span class="mr-2">${categoria.icono}</span> ${categoria.nombre}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        `;

        // Productos de la categoría
        categoria.productos.forEach(prod => {
            html += `
                <div class="bg-white p-4 rounded-lg shadow-md flex gap-4 border border-gray-100">
                    <img src="${prod.imagen}" alt="${prod.nombre}" class="w-24 h-24 object-cover rounded-md bg-gray-200">
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <h4 class="font-bold text-lg text-gray-800">${prod.nombre}</h4>
                            <p class="text-gray-500 text-sm line-clamp-2">${prod.desc}</p>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <span class="font-bold text-green-600 text-lg">$${prod.precio}</span>
                            <button onclick="agregarAlCarrito(${prod.id})" 
                                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold transition">
                                AGREGAR +
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div></div>`; // Cierre de grid y categoria
    });

    contenedor.innerHTML = html;
}

// =========================================
// 3. LÓGICA DE AGREGAR AL CARRITO (MODIFICADA)
// =========================================
function agregarAlCarrito(idProducto) {
    let productoEncontrado;
    
    // Buscar el producto en todas las categorías
    MENU.forEach(cat => {
        const prod = cat.productos.find(p => p.id === idProducto);
        if (prod) productoEncontrado = prod;
    });

    if (!productoEncontrado) return;

    // LÓGICA NUEVA:
    // Si tiene opciones (variantes o cantidad), abrimos el modal.
    if (productoEncontrado.opciones) {
        abrirModalOpciones(productoEncontrado);
    } else {
        // Si es un producto simple, lo agregamos directo (pero estandarizamos el objeto)
        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            cantidad: 1, // Importante: siempre definimos cantidad
            imagen: productoEncontrado.imagen
        });
        actualizarBadge();
        mostrarNotificacion(`Agregaste ${productoEncontrado.nombre}`);
    }
}

// =========================================
// 4. LÓGICA DEL MODAL DE OPCIONES (NUEVO)
// =========================================
function abrirModalOpciones(producto) {
    productoSeleccionadoTemp = producto; // Guardamos en memoria
    
    const modal = document.getElementById('modal-opciones');
    const titulo = document.getElementById('modal-titulo-producto');
    const contenido = document.getElementById('modal-contenido');
    const precioAdicional = document.getElementById('modal-precio-adicional');

    // Mostrar modal
    modal.classList.remove('hidden');
    titulo.innerText = producto.nombre;
    precioAdicional.innerText = "+$0"; // Reset visual
    contenido.innerHTML = ""; // Limpiar contenido anterior

    let html = '';

    // A) Si es tipo VARIANTE (Ej: Simple/Doble)
    if (producto.opciones.tipo === 'variante') {
        html += `<p class="font-bold mb-2">${producto.opciones.titulo || 'Elige una opción:'}</p>`;
        producto.opciones.items.forEach((item, index) => {
            // El primero viene marcado (checked) por defecto
            const checked = index === 0 ? 'checked' : ''; 
            html += `
                <label class="flex items-center justify-between p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50">
                    <div class="flex items-center gap-2">
                        <input type="radio" name="variante" value="${index}" ${checked} onchange="calcularTotalOpciones()" class="w-5 h-5 text-yellow-500">
                        <span>${item.nombre}</span>
                    </div>
                    <span class="text-gray-500">+$${item.precio}</span>
                </label>
            `;
        });
    }

    // B) Si es tipo CANTIDAD (Ej: Empanadas)
    if (producto.opciones.tipo === 'cantidad') {
        html += `
            <div class="flex flex-col items-center justify-center p-4">
                <p class="font-bold mb-4">${producto.opciones.titulo || 'Cantidad:'}</p>
                <div class="flex items-center gap-4">
                    <button onclick="cambiarCantidad(-1)" class="w-10 h-10 rounded-full bg-gray-200 font-bold text-xl text-gray-600">-</button>
                    <span id="contador-cantidad" class="text-2xl font-bold w-12 text-center">1</span>
                    <button onclick="cambiarCantidad(1)" class="w-10 h-10 rounded-full bg-yellow-400 font-bold text-xl text-black">+</button>
                </div>
            </div>
        `;
    }

    // C) Si tiene EXTRAS (Bacon, Cheddar, etc) - Siempre se muestran si existen
    if (producto.opciones.extras) {
        html += `<p class="font-bold mt-4 mb-2">Extras:</p>`;
        producto.opciones.extras.forEach((extra, index) => {
            html += `
                <label class="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div class="flex items-center gap-2">
                        <input type="checkbox" name="extra" value="${index}" onchange="calcularTotalOpciones()" class="w-5 h-5 rounded text-yellow-500">
                        <span>${extra.nombre}</span>
                    </div>
                    <span class="text-gray-500">+$${extra.precio}</span>
                </label>
            `;
        });
    }

    contenido.innerHTML = html;
    calcularTotalOpciones(); // Calcular precio inicial al abrir
}

function cambiarCantidad(delta) {
    const contador = document.getElementById('contador-cantidad');
    let valor = parseInt(contador.innerText);
    valor += delta;
    if (valor < 1) valor = 1; // No dejar bajar de 1
    contador.innerText = valor;
    calcularTotalOpciones();
}

function calcularTotalOpciones() {
    let totalAdicional = 0;
    
    // Sumar Variantes
    const varianteSeleccionada = document.querySelector('input[name="variante"]:checked');
    if (varianteSeleccionada) {
        const index = varianteSeleccionada.value;
        totalAdicional += productoSeleccionadoTemp.opciones.items[index].precio;
    }

    // Sumar Extras
    const extrasSeleccionados = document.querySelectorAll('input[name="extra"]:checked');
    extrasSeleccionados.forEach(chk => {
        const index = chk.value;
        totalAdicional += productoSeleccionadoTemp.opciones.extras[index].precio;
    });

    // Calcular Cantidad
    const contador = document.getElementById('contador-cantidad');
    let cantidad = 1;
    if (contador) {
        cantidad = parseInt(contador.innerText);
    }

    // Calculamos el precio total de este pedido específico
    const precioBase = productoSeleccionadoTemp.precio;
    const precioUnitarioFinal = precioBase + totalAdicional;
    const precioTotalLote = precioUnitarioFinal * cantidad;

    // Mostramos el total en el botón verde del modal
    document.getElementById('modal-precio-adicional').innerText = `$${precioTotalLote}`;
}

function confirmarOpciones() {
    let precioUnitarioFinal = productoSeleccionadoTemp.precio;
    let detallesNombre = [];
    let cantidad = 1;

    // 1. Procesar Variante
    const varianteSeleccionada = document.querySelector('input[name="variante"]:checked');
    if (varianteSeleccionada) {
        const item = productoSeleccionadoTemp.opciones.items[varianteSeleccionada.value];
        precioUnitarioFinal += item.precio;
        // Solo agregamos al nombre si no es la opción "Simple" o "Base"
        if (item.precio > 0 || item.nombre !== "Simple") { 
             detallesNombre.push(item.nombre); 
        }
    }

    // 2. Procesar Extras
    const extrasSeleccionados = document.querySelectorAll('input[name="extra"]:checked');
    extrasSeleccionados.forEach(chk => {
        const extra = productoSeleccionadoTemp.opciones.extras[chk.value];
        precioUnitarioFinal += extra.precio;
        detallesNombre.push(`+ ${extra.nombre}`);
    });

    // 3. Procesar Cantidad
    const contador = document.getElementById('contador-cantidad');
    if (contador) {
        cantidad = parseInt(contador.innerText);
    }

    // Construir nombre final
    let nombreFinal = productoSeleccionadoTemp.nombre;
    if (detallesNombre.length > 0) {
        nombreFinal += ` (${detallesNombre.join(', ')})`;
    }

    // Agregar al carrito
    carrito.push({
        id: productoSeleccionadoTemp.id,
        nombre: nombreFinal,
        precio: precioUnitarioFinal,
        cantidad: cantidad,
        imagen: productoSeleccionadoTemp.imagen
    });

    actualizarBadge();
    cerrarModalOpciones();
    mostrarNotificacion(`Agregaste ${cantidad}x ${productoSeleccionadoTemp.nombre}`);
}

function cerrarModalOpciones() {
    document.getElementById('modal-opciones').classList.add('hidden');
    productoSeleccionadoTemp = null;
}

// =========================================
// 5. FUNCIONES DEL CARRITO Y WHATSAPP
// =========================================

function actualizarBadge() {
    const badge = document.getElementById('cart-count');
    // Sumamos la cantidad de items, no solo el largo del array (para que 1 docena cuente como 12 o como 1 paquete)
    // Por simplicidad, contamos "lineas" de pedido.
    badge.innerText = carrito.length;
    
    badge.classList.add('scale-125');
    setTimeout(() => badge.classList.remove('scale-125'), 200);
}

function abrirCarrito() {
    const modal = document.getElementById('modal-carrito');
    const lista = document.getElementById('lista-carrito');
    const totalEl = document.getElementById('total-carrito');
    
    modal.classList.remove('hidden');
    
    if (carrito.length === 0) {
        lista.innerHTML = '<p class="text-center text-gray-500 py-4">Tu carrito está vacío 😢</p>';
        totalEl.innerText = '$0';
        return;
    }

    let html = '';
    let total = 0;

    carrito.forEach((item, index) => {
        // CORRECCIÓN IMPORTANTE: Multiplicar precio por cantidad
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        html += `
            <div class="flex justify-between items-center border-b py-2">
                <div>
                    <p class="font-bold text-sm">
                        <span class="text-yellow-600 font-bold">${item.cantidad}x</span> ${item.nombre}
                    </p>
                    <p class="text-gray-500 text-xs">$${item.precio} c/u = $${subtotal}</p>
                </div>
                <button onclick="eliminarDelCarrito(${index})" class="text-red-500 text-xs font-bold px-2">X</button>
            </div>
        `;
    });

    lista.innerHTML = html;
    totalEl.innerText = `$${total}`;
}

function cerrarCarrito() {
    document.getElementById('modal-carrito').classList.add('hidden');
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    abrirCarrito();
    actualizarBadge();
}

function enviarPedido() {
    if (carrito.length === 0) return;

    let mensaje = `Hola *${CONFIG.nombre}*! Quiero pedir:%0A%0A`;
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += `▪️ *${item.cantidad}x* ${item.nombre} ($${subtotal})%0A`;
    });

    mensaje += `%0A💰 *TOTAL: $${total}*`;
    
    // Envío
    const metodoEntrega = document.querySelector('input[name="entrega"]:checked')?.value;
    if (metodoEntrega === 'delivery') {
        mensaje += `%0A🛵 *Envío a domicilio*`;
        const direccion = document.getElementById('direccion').value;
        if(direccion) mensaje += ` (%20${direccion})`;
    } else {
        mensaje += `%0A🏃 *Retiro en local*`;
    }

    window.open(`https://wa.me/${CONFIG.telefono}?text=${mensaje}`, '_blank');
}

function mostrarNotificacion(texto) {
    const notif = document.createElement('div');
    notif.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50 animate-bounce';
    notif.innerText = texto;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}