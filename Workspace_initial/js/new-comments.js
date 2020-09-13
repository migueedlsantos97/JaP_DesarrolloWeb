//Accedo al formulario de Nuevo comentario

var usuario = document.getElementById("comment-user").Value;
var comentario = document.getElementById("comment-user").Value;


/*function fechaComentario(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

window.onload = function () {
    var now = new Date();
    var strDateTime = [[fechaComentario(now.getDate()),
    fechaComentario(now.getMonth() + 1),
    now.getFullYear()].join("/"),
    [fechaComentario(now.getHours()),
    fechaComentario(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    document.getElementById("Fecha-comentario").innerHTML = strDateTime;
};*/


var today = new Date();
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

document.getElementById("Fecha-comentario").Value = dateTime;

