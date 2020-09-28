let logueado = localStorage.getItem("estaLogueado");
function exist() {
    if (typeof (logueado) == "object") {
        logueado = "false";
        localStorage.setItem("estaLogueado", logueado);
    }
}

function redireccion() {
    if (logueado != "true") {
        window.location.replace("./login.html");
    }
}

exist();
redireccion();