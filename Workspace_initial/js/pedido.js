const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
cargarEventos();

function cargarEventos() {
    producto.addEventListenner('click', (e) => { carro.comprarProducto(e) });
    carrito.addEventListener('click', (e) => { carrito.eliminarProducto(e) });
    vaciarCarritoBtn.addEventListener('click', (e) => { carrito.vaciarCarrito(e) });
}