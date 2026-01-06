// =========================================
// CONFIGURACIÓN DEL NEGOCIO
// =========================================
const CONFIG = {
    nombre: "Mimuza Berazategui",
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
                nombre: "Cheeseburger Custom", // Le cambié el nombre para que tenga sentido elegir tamaño
                desc: "Medallón de carne, cheddar y salsa de la casa.",
                precio: 11500, // Precio base (Simple)
                imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
                opciones: {
                    tipo: "variante",
                    titulo: "Elige el tamaño:",
                    items: [
                        { nombre: "Simple", precio: 0 },
                        { nombre: "Doble", precio: 2000 }, // Suma para llegar a los 13500 aprox
                        { nombre: "Triple", precio: 4000 }
                    ],
                    extras: [
                        { nombre: "Bacon Crujiente", precio: 1500 },
                        { nombre: "Huevo a la plancha", precio: 1000 }
                    ]
                }
            },
            {
                id: 102,
                nombre: "La Mimuza Royal",
                desc: "Doble carne, bacon, huevo, cebolla crispy.",
                precio: 15000,
                imagen: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=500&q=60",
                opciones: {
                    tipo: "variante", // Aunque ya es completa, dejamos que elijan si quieren sacar algo o agregar más
                    titulo: "¿Algún extra?",
                    items: [
                        { nombre: "Tal cual viene", precio: 0 }
                    ],
                    extras: [
                        { nombre: "Extra Cheddar", precio: 1200 },
                        { nombre: "Extra Bacon", precio: 1500 }
                    ]
                }
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
                imagen: "https://acdn-us.mitiendanube.com/stores/004/080/332/products/14-c8ef10105222cfb42b17524982864705-1024-1024.webp"
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
                imagen: "https://images.unsplash.com/photo-1619926340139-9a2e2245a64e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                opciones: {
                    tipo: "cantidad",
                    titulo: "¿Cuántas unidades?"
                }
            },
            {
                id: 302,
                nombre: "Jamón y Queso",
                desc: "Clásica que nunca falla.",
                precio: 1500,
                imagen: "https://www.clarin.com/img/2021/04/12/WYz8Yr8tB_1256x620__1.jpg",
                opciones: {
                    tipo: "cantidad",
                    titulo: "¿Cuántas unidades?"
                }
            }
        ]
    }
];