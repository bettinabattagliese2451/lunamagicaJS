document.addEventListener('DOMContentLoaded', function () {
    let productos = [];
    let carrito = [];

    // Obtener productos desde el archivo JSON
    fetch("./js/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;

            // Agregar eventos de clic a los botones "Comprar"
            const botonesComprar = document.querySelectorAll('.cont-button input[type="button"]');
            botonesComprar.forEach(boton => {
                const id = parseInt(boton.getAttribute('data-id'));
                boton.addEventListener('click', function () {
                    agregarAlCarrito(id);
                });
            });

            // Agregar el primer producto al carrito después de cargar la página
            agregarAlCarrito(productos[0].id);
        });

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        const carritoContainer = document.getElementById('carrito');
        const totalCarrito = document.getElementById('total-carrito');

        if (carritoContainer && totalCarrito) {
            carritoContainer.innerHTML = '';

            carrito.forEach(function (item, index) {
                const div = document.createElement('div');
                div.classList.add('carrito-item');
                div.innerHTML = `
                    <span>${item.nombre} - $${item.precio}</span>
                    <button class="quitar-item" data-id="${item.id}">Quitar</button>
                `;
                carritoContainer.appendChild(div);
            });

            const total = carrito.reduce((sum, item) => sum + item.precio, 0);
            totalCarrito.textContent = `Total: $${total}`;

            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(id) {
        const producto = productos.find(item => item.id === id);
        if (producto) {
            carrito.push(producto);
            actualizarCarrito();
        }
    }

    // Función para quitar un producto del carrito
    function quitarDelCarrito(id) {
        Swal.fire({
            title: '¿Está de acuerdo con quitar el artículo del carrito?',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                const index = carrito.findIndex(item => item.id === id);
                if (index !== -1) {
                    carrito.splice(index, 1);
                    actualizarCarrito();
                }
            }
        });
    }

    // Seleccionar los botones "Quitar" en el carrito y agregar eventos de clic a cada uno
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('quitar-item')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            quitarDelCarrito(id);
        }
    });

    // Verificar si hay un carrito almacenado en localStorage al cargar la página
    const carritoAlmacenado = localStorage.getItem('carrito');
    if (carritoAlmacenado) {
        carrito = JSON.parse(carritoAlmacenado);
        actualizarCarrito();
    }
});




