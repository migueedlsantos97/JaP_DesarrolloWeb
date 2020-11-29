var articles = {};

document.addEventListener("DOMContentLoaded", function (e) {
    //traigo los datos guardados en un JSON y los guardo e imprimo en HTML...
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articles = resultObj.data.articles[0];
        };
        let nameArtHTML = document.getElementById("nombre-Art");
        let cantidadArtHTML = document.getElementById("cantidad-Art").value;
        let costArtHTML = document.getElementById("costoUnit-Art");

        //imprimo los resultados en los td de la tabla de articulos...
        nameArtHTML.innerHTML = articles.name;
        cantidadArtHTML.innerHTML = articles.count;
        costArtHTML.innerHTML = `$` + " " + articles.unitCost;
    });

    //cuando el valor de cantidad de artículos cambia se activa esta función...
    document.addEventListener("change", function () {
        var subTotalArt = document.getElementById("subTotal-Art");
        var cantidadArt = document.getElementById("cantidad-Art").value;
        var costoUnitArt = articles.unitCost;

        var SubTotal = cantidadArt * costoUnitArt;
        subTotalArt.innerHTML = `U$` + " " + SubTotal;

        //actualización de los costos totales...
        var subTFinal = document.getElementById("subtotalText");
        var Total = document.getElementById("totalCostText");

        //imprimo los resultados de subTotal de la tabla...
        subTFinal.innerHTML = `U$` + " " + SubTotal;
        seleccionEnvio();

        //función para calcular el costo de envío en base al subTotal...
        function seleccionEnvio() {

            if (document.querySelector('input[name="envioType"]:checked') !== null) {

                let envioSelect = document.querySelector('input[name="envioType"]:checked').id;
                let textoEnvio = document.getElementById("text-Envio");

                //al seleccionar un input radio se recalcula e imprime texto...
                switch (envioSelect) {
                    case "expressradio":
                        totalEnvio = Math.round(SubTotal * 0.07);
                        textoEnvio.innerText = "ha seleccionado: envío Express";
                        break;
                    case "standardradio":
                        totalEnvio = Math.round(SubTotal * 0.03);
                        textoEnvio.innerText = "ha seleccionado: envío Standar";
                        break;
                }
            } else {
                totalEnvio = 0;
            }
            //imprimo los resultados de costo de envío de la tabla...
            document.getElementById("envioText").innerHTML = `U$` + " " + totalEnvio;
        };
        //calculo el IVA en base al subTotal del artículo...
        var iva = document.getElementById("textIVA");
        impIVA = Math.round(SubTotal * 0.22);
        iva.innerHTML = `U$` + " " + impIVA;
        //imprimo los resultados...
        var TotalFinal = SubTotal + totalEnvio + impIVA;
        Total.innerHTML = `U$` + " " + TotalFinal;
    });
    //eliminar producto de la tabla...
    var eliminarArt = document.getElementById("eliminar-Art");
    eliminarArt.addEventListener("click", function () {
        //alerta personalizada con SweetsAlerts...
        Swal.fire({
            title: '¿Estas seguro de eliminar el artículo?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, elimínelo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'El artículo ha sido eliminado, pero no se lamente y vaya por otro.',
                    'success'
                )
                //si hay "OK" del user se elimina el artículo...
                $("#articulo").remove();

            }
        })
        // carritoVacio();
    });
    //evento que se activa al dar click "Realizar pago"...
    document.getElementById("formulario-tarjeta").addEventListener("submit", validarFormulario);
    function validarFormulario(e) {
        e.preventDefault();
        let numeroTarjeta = document.getElementById("inputNumero").value;
        let nombreTarjeta = document.getElementById("inputNombre").value;
        let ccv = document.getElementById("inputCCV").value;
        if (numeroTarjeta.length < 12) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Debe ingresar 12 dígitos de la tarjeta.',
                showConfirmButton: false,
                timer: 2000
            })
        } else if (nombreTarjeta.length === 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Debe ingresar el nombre del títular de la tarjeta.',
                showConfirmButton: false,
                timer: 2000
            })
        } else if (ccv.length === 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Debe ingresar el código de seguridad de la tarjeta.',
                showConfirmButton: false,
                timer: 2000
            })
        }
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su compra ha sido realizada con éxito!!',
            showConfirmButton: false,
            timer: 1500
        })
    }

});

//función que se ejecuta si no hay artículos en el carrito...

// function carritoVacio() {
//     let htmlContentToAppend = "";

//     if (articles.data.length === 0) {
//         htmlContentToAppend += `
//       <tr>
//         <td colspan="4">
//           <div>
//               <i class="fas fa-shopping-cart cart"></i>
//               <p>No hay elementos aquí, vaya a gastar un poco de plata...!</p>
//               <a href="inicio.html" id="btnInicio">Volver al inicio</a>
//           </div>
//         </td>
//       </tr>
//       `
//         document.getElementById("tbody").innerHTML = htmlContentToAppend;

//funcion que se ejecuta al agregar un producto al carrito desde product-info...

//creo un array con el nuevo artículo...
var miObjeto = new Object();
miObjeto.name = "Chevrolet Onix Joy";
miObjeto.count = 1;
miObjeto.unitCost = 13500;
miObjeto.currency = "USD";
miObjeto.src = "img/prod1.jpg";

var myString = JSON.stringify(miObjeto);















//Modal de la tarjeta

const tarjeta = document.querySelector('#tarjeta'),
    btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
    formulario = document.querySelector('#formulario-tarjeta'),
    numeroTarjeta = document.querySelector('#tarjeta .numero'),
    nombreTarjeta = document.querySelector('#tarjeta .nombre'),
    logoMarca = document.querySelector('#logo-marca'),
    firma = document.querySelector('#tarjeta .firma p'),
    mesExpiracion = document.querySelector('#tarjeta .mes'),
    yearExpiracion = document.querySelector('#tarjeta .year');
ccv = document.querySelector('#tarjeta .ccv');

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active');
    }
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente.
for (let i = 1; i <= 12; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
        // Eliminamos espacios en blanco
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '')
        // Ponemos espacio cada cuatro numeros
        .replace(/([0-9]{4})/g, '$1 ')
        // Elimina el ultimo espaciado
        .trim();

    numeroTarjeta.textContent = valorInput;

    if (valorInput == '') {
        numeroTarjeta.textContent = '#### #### #### ####';

        logoMarca.innerHTML = '';
    }

    if (valorInput[0] == 4) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);
    } else if (valorInput[0] == 5) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    // Volteamos la tarjeta para que el usuario vea el frente.
    mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if (valorInput == '') {
        nombreTarjeta.textContent = 'Jhon Doe';
    }

    mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active');
    }

    formulario.inputCCV.value = formulario.inputCCV.value
        // Eliminar los espacios
        .replace(/\s/g, '')
        // Eliminar las letras
        .replace(/\D/g, '');

    ccv.textContent = formulario.inputCCV.value;
});