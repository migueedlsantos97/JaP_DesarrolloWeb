// Navegation Menu
let btnMenu = document.querySelector(".btn-menu");
let barIconX = document.querySelector(".btn-menu i");
let menu = document.querySelector(".list-container");
let menuContent = document.querySelector(".site-header");
var activador = true;

//Intercala clase "activa"
let enlaces = document.querySelectorAll(".lists li a");
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

//Scroll Efect

let prevScrollPos = window.pageYOffset; //Esta variable esta fuera del onScroll, me devuelve de la ventana en gral (valor estático)
let goTop = document.querySelector(".go-top");

window.onscroll = () => {
  //Hide & Show - Scroll Menu (Function)
  let currentScrollPos = window.pageYOffset; //Esta variable esta fuera del onScroll, me devuelve de la ventana al hacer scroll (los valores cambiante).
  //Mostrar un ocultar menú

  if (prevScrollPos > currentScrollPos) {
    menuContent.style.top = "0px";
    menuContent.style.transition = "0.5s";
  } else {
    menuContent.style.top = "-60px";
    menuContent.style.transition = "0.5s";
  }
  prevScrollPos = currentScrollPos;

  //Mostrar y ocultar scroll Estilos
  let arriba = window.pageYOffset;

  //Conditions
  if (arriba <= 200) {
    menuContent.style.borderBottom = "none";

    //Ocultar Go Top
    goTop.style.right = "-100px";
  } else {
    menuContent.style.borderBottom = "3px solid #0554F2";

    //Mostrar Go Top
    goTop.style.right = "0px";
  }
};

//Go Top Click
goTop.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

/*let abajo = document.querySelector("#abajo");

abajo.addEventListener("click", () => {
  document.body.scrollTop = 600;
  document.documentElement.scrollTop = 600;
});*/

/**Barra de búsqueda**/
$(document).ready(function () {
  var submitIcon = $(".searchbar-icon");
  var inputBox = $(".searchbar-input");
  var searchbar = $(".searchbar");
  var isOpen = false;
  submitIcon.click(function () {
    if (isOpen == false) {
      searchbar.addClass("searchbar-open");
      inputBox.focus();
      isOpen = true;
    } else {
      searchbar.removeClass("searchbar-open");
      inputBox.focusout();
      isOpen = false;
    }
  });
  submitIcon.mouseup(function () {
    return false;
  });
  searchbar.mouseup(function () {
    return false;
  });
  $(document).mouseup(function () {
    if (isOpen == true) {
      $(".searchbar-icon").css("display", "block");
      submitIcon.click();
    }
  });
});
function buttonUp() {
  var inputVal = $(".searchbar-input").val();
  inputVal = $.trim(inputVal).length;
  if (inputVal !== 0) {
    $(".searchbar-icon").css("display", "none");
  } else {
    $(".searchbar-input").val("");
    $(".searchbar-icon").css("display", "block");
  }
}
