// Producto
function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

// Carrito
function Carrito() {
    this.productos = [];
}

// agregar productos al carrito
Carrito.prototype.agregarProducto = function(producto, cantidad) {
    this.productos.push({ producto, cantidad });
    mostrarAlerta(`${cantidad} unidad(es) de ${producto.nombre} agregadas al carrito.`);
};

// calcular el total
Carrito.prototype.calcularTotal = function() {
    return this.productos.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
};

// mostrar el carrito
Carrito.prototype.mostrarDetalle = function() {
    let detalle = "Productos en el carrito:\n";
    this.productos.forEach(item => {
        const totalPrecio = item.producto.precio * item.cantidad;
        detalle += `- ${item.cantidad} x ${item.producto.nombre} = ${formatoMonedaChilena.format(totalPrecio)} \n`;
    });
    return detalle;
};




// producto agregado
function mostrarAlerta(mensaje) {
    alert(mensaje);
}

// Inicialización de productos
const productos = [
    new Producto('Leche', 1000),
    new Producto('Pan de Molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azúcar', 1300)
];

const formatoMonedaChilena = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,

});

// Inicialización del carrito
let carrito = new Carrito();

// Función principal
function tienda() {
    let continuar = true;

    while (continuar) {
        // Mostrar la lista de productos
        let mensaje = "Seleccione un producto para agregar al carrito:\n";
        productos.forEach((producto, index) => {
            mensaje += `${index + 1}. ${producto.nombre} - ${formatoMonedaChilena.format(producto.precio)}\n`;
        });

        let seleccion = prompt(mensaje);

        if (seleccion >= 1 && seleccion <= 5) {
            let cantidad = prompt(`¿Cuántas unidades de ${productos[seleccion - 1].nombre} desea agregar? (1-10)`);
            cantidad = parseInt(cantidad);

            if (cantidad > 0 && cantidad <= 10) {
                carrito.agregarProducto(productos[seleccion - 1], cantidad);

                // Preguntar si desea seguir comprando
                let seguirComprando = prompt("¿Desea seguir comprando? (S/N)").toLowerCase();

                if (seguirComprando === "n" || seguirComprando === "no") {
                    finalizarCompra();
                    continuar = false; // Termina el ciclo de compra
                }
            } else {
                alert("Cantidad no válida. Debe ser un número entre 1 y 10.");
            }
        } else {
            alert("Selección no válida. Intente nuevamente.");
        }
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.productos.length === 0) {
        alert("El carrito está vacío. No hay productos para finalizar.");
    } else {
        let total = carrito.calcularTotal();
        let detalle = carrito.mostrarDetalle();
        alert(`${detalle}\nTotal: ${formatoMonedaChilena.format(total)} `);
    }
}



// Ejecutar la tienda
tienda();
