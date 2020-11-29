//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {

    //al ingresar nros al input se borran los caracteres incorrectos y se separan en grupos de 3...
    var celular = document.getElementById("tel");
    celular.addEventListener('keyup', (e) => {
        let valorInput = e.target.value;

        celular.value = valorInput
            // Eliminamos espacios en blanco
            .replace(/\s/g, '')
            // Eliminar las letras
            .replace(/\D/g, '')
            // Ponemos espacio cada cuatro numeros
            .replace(/([0-9]{3})/g, '$1 ')
            // Elimina el ultimo espaciado
            .trim();
    });

    //carga y guarda img en localStorage...
    const recentImageDataURL = localStorage.getItem("recent-image");
    if (recentImageDataURL) {
        document.querySelector("#imgPreview").setAttribute("src", recentImageDataURL);
        document.querySelector("#profile").setAttribute("src", recentImageDataURL)
    }

    document.querySelector("#urlImage").addEventListener("change", function () {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            localStorage.setItem("recent-image", reader.result);
        })
        reader.readAsDataURL(this.files[0]);
    })


    //al Guardar cambios aparece una alerta exitosa...
    // var imgUser = document.getElementById("imgUsuario").src;
    var nombre = document.getElementById("name");
    var apellido = document.getElementById("surname");
    var correo = document.getElementById("email");
    var contacto = document.getElementById("tel");
    let boton = document.getElementById("btnFperil");
    boton.addEventListener('click', () => {
        // localStorage.setItem("perfilUser", imgUser);
        localStorage.setItem("nameUser", nombre.value);
        localStorage.setItem("surnameUser", apellido.value);
        localStorage.setItem("emailUser", correo.value);
        localStorage.setItem("celUser", contacto.value);
    })

});