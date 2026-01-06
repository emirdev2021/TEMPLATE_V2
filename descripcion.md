# 📘 GUÍA MAESTRA DE PERSONALIZACIÓN - TEMPLATE V2

> **Documento de Referencia.** Utiliza esta guía cada vez que configures el sistema para un nuevo cliente.

---

## 📂 1. Mapa de Archivos (¿Dónde toco?)

* **`js/data.js`** (🟢 **Zona Verde - Edición Frecuente**):
    * Aquí vive **toda la información**: Menú, precios, fotos, nombre del local y teléfono.
    * Es el archivo que editarás el 90% del tiempo.

* **`index.html`** (🟡 **Zona Amarilla - Edición Visual**):
    * Aquí está el esqueleto. Se edita para cambiar textos fijos (títulos, botones) y agregar fuentes externas.

* **`js/app.js`** (🔴 **Zona Roja - Motor Lógico**):
    * Aquí está la magia de los cálculos y WhatsApp. **NO TOCAR** a menos que sea estrictamente necesario.

---

## ⚙️ 2. Configuración del Negocio

Abre `js/data.js` y busca la constante `CONFIG`.

```javascript
const CONFIG = {
    nombre: "Nombre del Local",      // Título en pestaña y WhatsApp
    descripcion: "Slogan del local", // Texto bajo el título
    telefono: "5491100000000",       // Formato internacional SIN '+'
    moneda: "$",
    envio: { costo: 1500, activo: true } // (Opcional)
};

🍔 3. Gestión del Menú
El menú está en js/data.js dentro de MENU.

A. Crear una Nueva Categoría
Copia y pega este bloque dentro del array MENU:
{
    id: "cat-nueva",    // ID único (ej: cat-bebidas)
    nombre: "Bebidas",  // Nombre visible
    icono: "🥤",        // Emoji
    productos: []       // Array vacío para llenar luego
}

B. Agregar Productos (3 Tipos)
Opción 1: Producto Simple (Ej: Pizza, Lata)

{
    id: 201, // ID ÚNICO
    nombre: "Muzzarella",
    desc: "Descripción del producto.",
    precio: 8000,
    imagen: "[https://link-foto.com/foto.jpg](https://link-foto.com/foto.jpg)"
}

Opción 2: Producto con Cantidad (Ej: Empanadas, Sushi)

{
    id: 301,
    nombre: "Empanada Carne",
    desc: "Frita y jugosa.",
    precio: 1500,
    imagen: "...",
    opciones: {
        tipo: "cantidad",           // Activa contador - / +
        titulo: "¿Cuántas unidades?"
    }
}

Opción 3: Producto Complejo (Ej: Hamburguesas con Variantes y Extras)

{
    id: 101,
    nombre: "Burger Completa",
    desc: "Con todo.",
    precio: 10000, // Precio BASE
    imagen: "...",
    opciones: {
        tipo: "variante",           // Activa Radio Buttons
        titulo: "Elige tamaño:",
        items: [                    // OBLIGATORIO elegir uno
            { nombre: "Simple", precio: 0 },
            { nombre: "Doble", precio: 2500 } // Suma al base
        ],
        extras: [                   // OPCIONAL (Checkboxes)
            { nombre: "Bacon", precio: 1500 },
            { nombre: "Huevo", precio: 1000 }
        ]
    }
}

🎨 4. Personalización Visual (Branding)
A. Cambiar Colores (Método Rápido)
El template usa TailwindCSS. Los colores se cambian reemplazando el nombre de la clase en todo el proyecto.

Ejemplo: Cambiar de Amarillo a Rojo

En VS Code, presiona CTRL + SHIFT + H (Búsqueda Global).

Buscar: yellow-500 -> Reemplazar con: red-600 (Color principal).

Buscar: yellow-600 -> Reemplazar con: red-700 (Color hover/oscuro).

Dale a "Replace All".

Colores Sugeridos:

Rojo: red-600

Azul: blue-600

Verde: green-600

Negro: gray-900

Naranja: orange-500

B. Cambiar Fuentes (Tipografía)
Ve a Google Fonts, elige una fuente (ej: "Poppins") y copia el <link>.

Pega el link en el <head> de tu index.html.

En el <head>, busca la etiqueta <script src="https://cdn.tailwindcss.com"></script>.

Justo debajo, agrega la configuración para usar la fuente:

hmtl
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'], // Reemplaza 'Poppins' por tu fuente
        }
      }
    }
  }
</script>


🚀 5. Flujo de Trabajo (Git & Deploy)
Cada vez que termines de editar para un cliente:

Guardar Todo: CTRL + S en los archivos editados.

Terminal: Ejecuta en orden:
git add .
git commit -m "Configuración para Cliente X"
git push

Verificar: Abre el link de Vercel en tu celular y refresca la página.