////Intercala clase "activa" de los elementos "a" en mi "nav"
let enlaces = document.querySelectorAll(".list li a");
//utilizamos bucle (forEach), permite recorrer arreglos
enlaces.forEach((element) => {
  element.addEventListener("click", (event) => {
    //al hacer click recorre el arreglo element
    enlaces.forEach((link) => {
      //parametro link para recorrer los enlaces
      link.classList.remove("active"); //al hacer click remueve la clase
    });
    event.target.classList.add("active");
  });
});

//Averiguar porque en realidad no es un classList sino que tengo un Id como "active"
