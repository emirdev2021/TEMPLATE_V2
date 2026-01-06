// Estado del Carrito
let carrito = [];

// 1. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    renderizarEncabezado();
    renderizarMenu();
    actualizarBadge();
});

// 2. RENDERIZADO (PINTAR EN PANTALLA)
function renderizarEncabezado() {
    document.getElementById('nombre-local').innerText = CONFIG.nombre;
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

// 3. LÓGICA DEL CARRITO
function agregarAlCarrito(idProducto) {
    // Buscar el producto en todas las categorías
    let producto;
    MENU.forEach(cat => {
        const encontrado = cat.productos.find(p => p.id === idProducto);
        if (encontrado) producto = encontrado;
    });

    if (producto) {
        carrito.push(producto);
        actualizarBadge();
        mostrarNotificacion(`Agregaste ${producto.nombre}`);
    }
}

function actualizarBadge() {
    const badge = document.getElementById('cart-count');
    badge.innerText = carrito.length;
    
    // Animación simple
    badge.classList.add('scale-125');
    setTimeout(() => badge.classList.remove('scale-125'), 200);
}

// 4. MODAL Y WHATSAPP
function abrirCarrito() {
    const modal = document.getElementById('modal-carrito');
    const lista = document.getElementById('lista-carrito');
    const totalEl = document.getElementById('total-carrito');
    
    modal.classList.remove('hidden');
    
    // Renderizar lista
    if (carrito.length === 0) {
        lista.innerHTML = '<p class="text-center text-gray-500 py-4">Tu carrito está vacío 😢</p>';
        totalEl.innerText = '$0';
        return;
    }

    let html = '';
    let total = 0;

    // Agrupamos items iguales (básico)
    carrito.forEach((item, index) => {
        total += item.precio;
        html += `
            <div class="flex justify-between items-center border-b py-2">
                <div>
                    <p class="font-bold text-sm">${item.nombre}</p>
                    <p class="text-gray-500 text-xs">$${item.precio}</p>
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
    abrirCarrito(); // Re-renderizar
    actualizarBadge();
}

function enviarPedido() {
    if (carrito.length === 0) return;

    let mensaje = `Hola *${CONFIG.nombre}*! Quiero pedir:%0A%0A`;
    let total = 0;

    carrito.forEach(item => {
        total += item.precio;
        mensaje += `▪️ ${item.nombre} - $${item.precio}%0A`;
    });

    mensaje += `%0A💰 *TOTAL: $${total}*`;
    
    // Agregar opción de envío si está activo
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

// Helper de notificación
function mostrarNotificacion(texto) {
    const notif = document.createElement('div');
    notif.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50 animate-bounce';
    notif.innerText = texto;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}