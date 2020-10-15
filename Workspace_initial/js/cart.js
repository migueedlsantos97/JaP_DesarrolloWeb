// // class Carrito {
// //     //Añadir el producto al carrito
// //     comprarProducto(e) {
// //         e.preventDefault();
// //         if (e.target.classList.contains('agregar-carrito')) {
// //             const producto = e.target.parentElement.parentElement;
// //             this.leerDatosProducto(producto);

// //         }
// //     }
// //     leerDatosProducto(producto) {
// //         const infoProducto = {
// //             imagen: producto.querySelector('img').src,
// //             titulo: producto.querySelector('h4').textContent,
// //             precio: producto.querySelector('.precio span').textContent,
// //             id: producto.querySelector('a').getAttribute('data-id'),//sirve para eliminar dicho elemento del carrito.
// //             cantidad: 1
// //         }
// //         this.insertarCarrito(infoProducto);
// //     }
// //     insertarCarrito(producto) {
// //         const row = document.createElement('tr');
// //         row.innerHTML = `
// //             <td>
// //                 <img src="${producto.imagen}"´widht=100>
// //             </td>
// //             <td>${producto.titulo}</td>
// //             <td>${producto.precio}</td>
// //             <td>
// //                 <a href="#" class=" borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
// //             </td>
// //         `;
// //         listaProductos.appendChild(row);
// //     }
// //     eliminarProducto(e) {
// //         e.preventDefault();
// //         let producto, productoID;
// //         if (e.target.classList.contains('borrar-producto')) {
// //             e.target.parentElement.parentElement.remove();
// //             producto = e.target.parentElement.parentElement;
// //             productoID = producto.querySelector('a').getAttribute('data-id');
// //         }
// //     }
// //     vaciarCarrito(e) {
// //         e.preventDefault();
// //         while (listaProductos.firstChild) {
// //             listaProductos.removeChild(listaProductos.firstChild);
// //             return false;
// //         }
// //     }
// // }

// let cart = [];
// let cantArticulos;

// function showArticlesCart(array) {

//     let htmlContentToAppend = "";

//     for (let i = 0; i < array.length; i++) {
//         let carrito = array[i];

//         htmlContentToAppend += `

//             <div id="container-article" class="card mb-3 w-100" style="max-height: 150px;">
//                 <div id="card-article" class="row no-gutters w-100">
//                     <div id="container-img" class="col-md-4 centrado" >
//                     <img src="`+ carrito.src + `" class="card-img centrado" alt="" style="max-height: 150px; width: auto;">
//                     </div>
//                     <div class="col-md-8 bg-card-cart f-align-center">
//                         <div class="card-body">
//                             <div class="row centrado align-center pl-2">
//                                 <div class="row align-center no-gutters">
//                                     <h5>Nombre: </h5>
//                                     <p class="h4 pl-2">`+ carrito.name + `</p>
//                                 </div>
//                                 <div class="row align-center no-gutters">
//                                     <h5>Precio unitario: </h5>
//                                     <p class="h4 pl-2" id="moneda`+ i + `"> ` + carrito.currency + ` </p>
//                                     <p class="h4 pl-2 unitCost"> `+ carrito.unitCost + ` </p>
//                                 </div>
//                                 <div class="row align-center no-gutters">
//                                     <h5>Cantidad: </h5>
//                                     <input type="number" class="h4 pl-2 ml-2 " value="`+ carrito.count + `" onchange="calcNewSubTotal(this.value, ` + carrito.unitCost + `,` + i + `)" name="Cantidad` + i + `" min="0"> 
//                                 </div>
//                                 <div class="row align-center no-gutters bg-red pt-2">
//                                     <h5>Total: </h5>
//                                     <p class="h4 pl-2 " id="subTotal`+ i + `"> $` + PrecioTotal(carrito.currency, carrito.unitCost, carrito.count) + `  </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `

//         document.getElementById("cart-articles").innerHTML = htmlContentToAppend;
//     }
// }

// function PrecioTotal(moneda, cU, unidad) {
//     if (moneda == "UYU") {
//         let total = cU * unidad;
//         return total;
//     } else if (moneda == "USD") {
//         cUPesos = cU * 40;
//         let total = cUPesos * unidad;
//         return total;
//     }
// }

// function calcNewSubTotal(newCant, unitCost, i) {
//     let moneda = document.getElementById("moneda" + i)
//     document.getElementById("subTotal" + i).innerHTML = "$" + PrecioTotal(moneda.innerText, unitCost, newCant);
// }


// //Función que se ejecuta una vez que se haya lanzado el evento de
// //que el documento se encuentra cargado, es decir, se encuentran todos los
// //elementos HTML presentes.
// document.addEventListener("DOMContentLoaded", function (e) {
//     getJSONData(CART_INFO_URL).then(function (resultObj) {
//         if (resultObj.status === "ok") {
//             cart = resultObj.data;
//         }
//         showArticlesCart(cart.articles);
//     });

// });



let articulos = {};
let articulos2 = {};
let precioUnit = 0;
let precioUnit2 = 0;
let num = 0;
let num2 = 0;
let impSubtotal = 0;
let impSub2 = 0;

let subT = 0;
var subT2 = 0;
var porcentajeEnvio = 0.15;




function actualizarCostos() {

    let subText = document.getElementById("subtotalText");
    let envText = document.getElementById("envioText");
    let totalText = document.getElementById("totalCostText");

    //calculo el precio unitario del pino
    var t1 = (subT * 100);
    //calculo el precio unitario de autos y lo paso a pesos 
    var t2 = (subT2 * 12500 * 40);
    var t = (t2 + t1);

    let subtextHTML = t;
    let costoEnvioHTML = (porcentajeEnvio * t);
    let totalEnvioHTML = Math.round(t + costoEnvioHTML);

    subText.innerHTML = subtextHTML;
    envText.innerHTML = costoEnvioHTML;
    totalText.innerHTML = totalEnvioHTML;


    let detalleHtml = document.getElementById("detalleCompra");
    detalleHtml.innerHTML = ` Total a pagar $ ` + totalEnvioHTML;


}



//funcion que se ejecuta cuando se hace click en el boton aceptar
function btnAceptar() {

    document.getElementById("calle").value = "";
    document.getElementById("numeroL").value = "";
    document.getElementById("esquina").value = "";
    document.getElementById("detalleCompra").innerHTML = '';
    document.getElementById("subtotalText").innerHTML = 0;
    document.getElementById("envioText").innerHTML = 0;
    document.getElementById("totalCostText").innerHTML = 0;
    document.getElementById("numero").value = 0;
    document.getElementById("numero2").value = 0;
    document.getElementById("subTotal").innerHTML = 0;
    document.getElementById("subTotal2").innerHTML = 0;



}


document.addEventListener("DOMContentLoaded", function (e) {


    //funcion que trae el numero del input, se lo paso a una variable  e imprimo en otro id el monto.
    document.getElementById("numero").addEventListener("change", function () {
        var num = document.getElementById("numero").value;

        impSubtotal = document.getElementById("subTotal");
        impSubtotal.innerHTML = num * 100;
        subT = 100 * num;
        subT = this.value

        actualizarCostos();

    });

    //funcion que trae el numero del input, se lo paso a una variable  e imprimo en otro id el monto.
    document.getElementById("numero2").addEventListener("change", function () {
        var num2 = document.getElementById("numero2").value;

        impSub2 = document.getElementById("subTotal2");
        impSub2.innerHTML = (40 * 12500) * num2;
        subT2 = (Math.round(12500 * 40) * impSub2);

        subT2 = this.value;
        actualizarCostos();

    });


    document.getElementById("premiumradio").addEventListener("change", function () {
        porcentajeEnvio = 0.15;
        actualizarCostos()
    });

    document.getElementById("expressradio").addEventListener("change", function () {
        porcentajeEnvio = 0.07;
        actualizarCostos()
    });

    document.getElementById("standardradio").addEventListener("change", function () {
        porcentajeEnvio = 0.05;
        actualizarCostos()
    });








});



document.addEventListener("DOMContentLoaded", function (ex) {
    getJSONData(ARTICLES_CART).then(function (res) {
        if (res.status === "ok") {
            art = res.data;

            articulos = document.getElementById("art");
            articulos2 = document.getElementById("art2");
            precioUnit = document.getElementById("costoUnit");
            precioUnit2 = document.getElementById("costoUnit2");
            num = document.getElementById("numero");
            num2 = document.getElementById("numero2");

            for (let i = 0; i < art.articles.length; i++) {
                articulos.innerHTML = art.articles[0].name;
                precioUnit.innerHTML = art.articles[0].currency + ` ` + art.articles[0].unitCost;
                num.value = art.articles[0].count;

                if (art.articles[i]) {

                    articulos2.innerHTML = art.articles[i].name;
                    precioUnit2.innerHTML = art.articles[i].currency + ` ` + art.articles[i].unitCost;
                    num2.value = art.articles[i].count;
                }
            }

        }


    })
});