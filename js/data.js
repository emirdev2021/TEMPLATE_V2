// =========================================
// CONFIGURACIÓN DEL NEGOCIO
// =========================================
const CONFIG = {
    nombre: "Mimuza Burgers",
    telefono: "5491122512344", // Tu número para pruebas
    moneda: "$",
    envio: {
        costo: 1500, // Costo fijo de envío (opcional)
        activo: true
    }
};

// =========================================
// MENÚ DE PRODUCTOS
// =========================================
const MENU = [
    {
        id: "cat-hamburguesas",
        nombre: "Hamburguesas",
        icono: "🍔",
        productos: [
            {
                id: 101,
                nombre: "Cheeseburger Doble",
                desc: "Doble carne, doble cheddar, salsa de la casa.",
                precio: 13500,
                imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 102,
                nombre: "La Mimuza Royal",
                desc: "Doble carne, bacon, huevo, cebolla crispy.",
                precio: 15000,
                imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=500&q=60"
            }
        ]
    },
    {
        id: "cat-pizzas",
        nombre: "Pizzas",
        icono: "🍕",
        productos: [
            {
                id: 201,
                nombre: "Muzzarella Clásica",
                desc: "Salsa de tomate casera, mucha muzza y orégano.",
                precio: 12000,
                imagen: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 202,
                nombre: "Napolitana con Ajo",
                desc: "Rodajas de tomate fresco, ajo y perejil.",
                precio: 14000,
                imagen: "https://images.unsplash.com/photo-1595854341625-f33ee10431b0?auto=format&fit=crop&w=500&q=60"
            }
        ]
    },
    {
        id: "cat-empanadas",
        nombre: "Empanadas",
        icono: "🥟",
        productos: [
            {
                id: 301,
                nombre: "Carne Cortada a Cuchillo",
                desc: "Jugosas y con aceitunas.",
                precio: 1800,
                imagen: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 302,
                nombre: "Jamón y Queso",
                desc: "Clásica que nunca falla.",
                precio: 1800,
                imagen: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=60" // Repetimos img por ahora
            }
        ]
    }
];