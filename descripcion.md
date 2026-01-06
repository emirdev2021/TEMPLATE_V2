Modularidad Real: Separamos los DATOS (lo que cambia el cliente) de la LÓGICA (lo que hace que funcione).

Sin Dependencias Raras: HTML, CSS (Tailwind vía CDN) y JS Puro. Nada de instalaciones complejas.# 📘 GUÍA DE PERSONALIZACIÓN - TEMPLATE V2

Esta guía explica qué archivos modificar para adaptar este template a un nuevo cliente sin romper la lógica del sistema.

## 📂 Archivos Importantes
* `js/data.js`: **EL CEREBRO.** Aquí está el menú, precios y datos del dueño. (Se edita el 90% del tiempo).
* `index.html`: **LA ESTRUCTURA.** Aquí cambias el "esqueleto" visual (Logo, textos fijos).
* `js/app.js`: **EL MOTOR.** No tocar a menos que quieras cambiar cómo funciona el cálculo o WhatsApp.

---

## 1️⃣ Paso 1: Datos del Negocio (Cliente Nuevo)
**Archivo:** `js/data.js`
Busca la constante `CONFIG` al principio del archivo.

* `nombre`: El nombre que sale en el WhatsApp y en el título.
* `descripcion`: El slogan debajo del título.
* `telefono`: **CRUCIAL.** El número que recibe los pedidos (formato internacional, sin el +).
* `envio.costo`: Si cobran envío fijo, ponlo aquí.

---

## 2️⃣ Paso 2: Cargar el Menú
**Archivo:** `js/data.js`
Busca la constante `MENU`.

### Estructura Básica:
El menú se divide en **Categorías** (`Hamburguesas`, `Pizzas`).
Cada categoría tiene **Productos**.

### Cómo crear un producto simple:
```javascript
{
    id: 101, // ID ÚNICO (No repetir nunca)
    nombre: "Nombre del producto",
    desc: "Descripción corta",
    precio: 5000,
    imagen: "LINK_DE_LA_FOTO"
}