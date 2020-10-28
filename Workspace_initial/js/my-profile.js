//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
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

        // numeroTarjeta.textContent = valorInput;
    });
});