const formulario = document.getElementById("formulario"); //accedo al formulario.
const inputs = document.querySelectorAll("#formulario input"); //accedo a los datos de los inputs.

//Esta es una lista de expresiones que estan permitidas para el ingreso de datos en los campos del formulario.
const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};
//
const campos = {
  usuario: false,
  //nombre: false,
  password: false,
  //correo: false,
  //telefono: false,
};
//cada campo se comprueba y valida (expesiones).
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "usuario":
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      break;
  }
  if (usuario === "" || password === "") {
    alert("Debe ingresar usuario y contraseña");
  } else {
    logueado = "true";
    localStorage.setItem("estaLogueado", logueado);
    localStorage.setItem("user", usuario.value);
    window.location.replace("./inicio.html");
  }

};

//

//si los campos son correctos aparece la "palomita verde", sino, aparece la "x roja".
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};

//al soltar una tecla o hacer click se validan los datos
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});
//prevengo que al pusar "enviar" se envíen los datos y en lugar de eso, aparezca el cartel de "Enviado con éxito", en caso contrario aparece el de error.
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.usuario && campos.password) {
    formulario.reset();
    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 5000);
    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((icono) => {
        icono.classList.remove("formulario__grupo-correcto");
      });
  } else {
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
  }
});

//Función que borra el valor del input "Usuario"
//crea una alerta de "despedida" y redirige al Login.html
function cerrarSesion() {
  localStorage.removeItem("user");
  alert(
    "Esperemos vuelva pronto para disfrutar de más productos y obtener increíbles ofertas!!"
  );
  location.replace("./index.html");
}
