
let productos = [];

fetch("./js/productos.json")
    .then (response => response.json())
    .then (data => {
        productos = data;
        agregarAlCarrito(productos[0]);
    });


let carrito = [];


  // Función para actualizar la visualización del carrito
  function actualizarCarrito() {
      const carritoContainer = document.getElementById('carrito');
      carritoContainer.innerHTML = ''; // Limpiar el carrito antes de actualizarlo

      carrito.forEach(function (item, index) {
          const div = document.createElement('div');
          div.classList.add('carrito-item');
          div.innerHTML = `
              <span>${item.nombre} - $${item.precio}</span>
              <button class="quitar-item" data-index="${index}">Quitar</button>
          `;
          carritoContainer.appendChild(div);
      });

      // Actualizar el total
      const totalCarrito = document.getElementById('total-carrito');
      const total = carrito.reduce((sum, item) => sum + item.precio, 0);
      totalCarrito.textContent = `Total: $${total}`;

      // Guardar el carrito en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
      carrito.push(producto);
      actualizarCarrito();
  }

  // Función para quitar un producto del carrito
function quitarDelCarrito(index) {
    Swal.fire({
        title: '¿Está de acuerdo con quitar el siguiente artículo del carrito?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    });
}




  // Seleccionar los botones "Comprar" por su ID y agregar eventos de clic a cada uno
const botonesComprar = document.querySelectorAll('.cont-button input[type="button"]');
  botonesComprar.forEach(function (boton, index) {
      boton.addEventListener('click', function () {
          // Verificar que el índice esté dentro del rango de productos
          if (index < productos.length) {
              const producto = productos[index];
              agregarAlCarrito(producto);
          }
      });
  });
  


  // Seleccionar los botones "Quitar" en el carrito y agregar eventos de clic a cada uno
  document.addEventListener('click', function (event) {
      if (event.target.classList.contains('quitar-item')) {
          const index = parseInt(event.target.getAttribute('data-index'));
          quitarDelCarrito(index);
      }
  });

  // Verificar si hay un carrito almacenado en localStorage al cargar la página
  const carritoAlmacenado = localStorage.getItem('carrito');
  if (carritoAlmacenado) {
      carrito = JSON.parse(carritoAlmacenado);
      actualizarCarrito();
  };
