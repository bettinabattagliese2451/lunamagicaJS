document.addEventListener('DOMContentLoaded', function () {
    let productos = [];
    let carrito = [];

    // Obtener productos desde el archivo JSON
    fetch("./js/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
        });

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        // ... (código actualizado sin cambios)
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        carrito.push(producto);
        actualizarCarrito();
    }

    // Función para quitar un producto del carrito
    function quitarDelCarrito(index) {
        // ... (código actualizado sin cambios)
    }

    // Seleccionar los botones "Comprar" por su clase y agregar eventos de clic a cada uno
    const botonesComprar = document.querySelectorAll('.cont-button input[type="button"]');
    botonesComprar.forEach(function (boton, index) {
        boton.addEventListener('click', function () {
            if (index < productos.length) {
                const producto = productos[index];
                agregarAlCarrito(producto);
            }
        });
    });

    // Seleccionar los botones "Quitar" en el carrito y agregar eventos de clic a cada uno
    document.addEventListener('click', function (event) {
        // ... (código actualizado sin cambios)
    });

    // Verificar si hay un carrito almacenado en localStorage al cargar la página
    const carritoAlmacenado = localStorage.getItem('carrito');
    if (carritoAlmacenado) {
        carrito = JSON.parse(carritoAlmacenado);
        actualizarCarrito();
    }

    // Agregar el primer producto al carrito después de cargar la página
    agregarAlCarrito(productos[0]);
});
