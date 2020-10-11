// class Carrito {
//     //Añadir el producto al carrito
//     comprarProducto(e) {
//         e.preventDefault();
//         if (e.target.classList.contains('agregar-carrito')) {
//             const producto = e.target.parentElement.parentElement;
//             this.leerDatosProducto(producto);

//         }
//     }
//     leerDatosProducto(producto) {
//         const infoProducto = {
//             imagen: producto.querySelector('img').src,
//             titulo: producto.querySelector('h4').textContent,
//             precio: producto.querySelector('.precio span').textContent,
//             id: producto.querySelector('a').getAttribute('data-id'),//sirve para eliminar dicho elemento del carrito.
//             cantidad: 1
//         }
//         this.insertarCarrito(infoProducto);
//     }
//     insertarCarrito(producto) {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>
//                 <img src="${producto.imagen}"´widht=100>
//             </td>
//             <td>${producto.titulo}</td>
//             <td>${producto.precio}</td>
//             <td>
//                 <a href="#" class=" borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
//             </td>
//         `;
//         listaProductos.appendChild(row);
//     }
//     eliminarProducto(e) {
//         e.preventDefault();
//         let producto, productoID;
//         if (e.target.classList.contains('borrar-producto')) {
//             e.target.parentElement.parentElement.remove();
//             producto = e.target.parentElement.parentElement;
//             productoID = producto.querySelector('a').getAttribute('data-id');
//         }
//     }
//     vaciarCarrito(e) {
//         e.preventDefault();
//         while (listaProductos.firstChild) {
//             listaProductos.removeChild(listaProductos.firstChild);
//             return false;
//         }
//     }
// }

let cart = [];
let cantArticulos;

function showArticlesCart(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let carrito = array[i];

        htmlContentToAppend += `

            <div class="card mb-3 w-100" style="max-height: 200px;">
                <div class="row no-gutters w-100">
                    <div class="col-md-4 centrado" >
                    <img src="`+ carrito.src + `" class="card-img centrado" alt="" style="max-height: 200px; width: auto;">
                    </div>
                    <div class="col-md-8 bg-card-cart f-align-center">
                        <div class="card-body">
                            <div class="row centrado align-center pl-2">
                                <div class="row align-center no-gutters">
                                    <h5>Nombre: </h5>
                                    <p class="h4 pl-2">`+ carrito.name + `</p>
                                </div>
                                <div class="row align-center no-gutters">
                                    <h5>Precio unitario: </h5>
                                    <p class="h4 pl-2" id="moneda`+ i + `"> ` + carrito.currency + ` </p>
                                    <p class="h4 pl-2 unitCost"> `+ carrito.unitCost + ` </p>
                                </div>
                                <div class="row align-center no-gutters">
                                    <h5>Cantidad: </h5>
                                    <input type="number" class="h4 pl-2 ml-2 " value="`+ carrito.count + `" onchange="calcNewSubTotal(this.value, ` + carrito.unitCost + `,` + i + `)" name="Cantidad` + i + `" min="0"> 
                                </div>
                                <div class="row align-center no-gutters bg-red pt-2">
                                    <h5>Total: </h5>
                                    <p class="h4 pl-2 " id="subTotal`+ i + `"> $` + calcPrecioTotal(carrito.currency, carrito.unitCost, carrito.count) + `  </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        document.getElementById("cart-articles").innerHTML = htmlContentToAppend;
    }
}

function calcPrecioTotal(moneda, costoUnitario, unidad) {
    if (moneda == "UYU") {
        let total = costoUnitario * unidad;
        return total;
    } else if (moneda == "USD") {
        costoUnitarioPesos = costoUnitario * 40;
        let total = costoUnitarioPesos * unidad;
        return total;
    }
}

function calcNewSubTotal(newCant, unitCost, i) {
    let moneda = document.getElementById("moneda" + i)
    document.getElementById("subTotal" + i).innerHTML = "$" + calcPrecioTotal(moneda.innerText, unitCost, newCant);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data;
        }
        showArticlesCart(cart.articles);
    });

});