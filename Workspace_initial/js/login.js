//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {});

//obtengo todos los elementos con la clase .input y los almaceno en un var "inputs", esto es un array (variable con varios datos)
var inputs = document.getElementsByClassName("form-input");
//hago un recorrido, y ese recorrido se va a repetir la misma cantidad de elementos que se han obtenido de la clase .input
for (var i = 0; i < inputs.length; i++) {
  //escucha el evento "keyup" (es cuando yo suelto una tecla) y va a evaluar si este valor es >=1, selecciona al siguiente elemento y agrega la clase .fijar, si no es mayor se le quita esa clase.
  inputs[i].addEventListener("keyup", function () {
    if (this.value.length >= 1) {
      this.nextElementsSiblings.classList.add("fijar");
    } else {
      this.nextElementsSiblings.classList.remove("fijar");
    }
  });
}
