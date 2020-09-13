//Función para obetener la fecha y hora del sistema, para así cargarlo en mi Formulario de nuevo Comentario.

function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;//sumamos 1 porque arranca en 0.
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}

// Devuelve la fecha y hora y carga los valores al input.
setInterval(function () {
    DateComentary = getDateTime();
    document.getElementById("comment-dateUser").value = DateComentary;
}, 1000);

//Función para limpiar solo el campo "Textarea" de mi Formulario de nuevo comentario.
function limpiar() {
    document.getElementById("contenido").value = "";
}

//Función para agregar el nuevo comentario.



/*function nuevoComentario() {
    let usuario = document.getElementById("comment-dateUser").value;
    let fechaComentario = DateComentary;
    let comentario = document.getElementById("contenido").value;
    var comentarioNuevo = {
        "score": puntuacion,
        "description": comentario,
        "user": usuario,
        "dateTime": fechaComentario
    }
    commentArray.push(comentarioNuevo);
    showComments(Array);
}

document.getElementsByClassName("btn-send").addEventListenner("click", function (a) {
    a.preventDefault(),
        nuevoComentario(ratingStars);
});*/