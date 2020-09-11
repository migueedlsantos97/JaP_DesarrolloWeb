//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML = document.getElementById(
        "productDescription"
      );
      let productCurrencyAndCostHTML = document.getElementById(
        "productCurrency"
      );
      let productSoldCountHTML = document.getElementById("productSoldCount");

      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCurrencyAndCostHTML.innerHTML =
        product.currency + ` ` + product.cost;
      productSoldCountHTML.innerHTML = product.soldCount;

      //Muestro las imagenes en forma de galería (sin controles)
      showImagesGallery(product.images);
      //Muestro imagenes de los productos relacionados
      showRelatedProducts(product.relatedProducts);
    }
  });
});

//Funcion que crea el rating de "caritas" para la calificación
//rating = 0; Face:"meh-blank";
//rating = 1; Face:"angry";Text:"Muy malo"
//rating = 2; Face:"frown";Text:"Malo"
//rating = 3; Face:"meh";Text:"Aceptable"
//rating = 4; Face:"grin-alt";Text:"Muy bueno"
//rating = 5; Face:"grin-stars";Text:"Excelente"
function ratingFaces(rating) {
  let faces;
  if (rating === 0) {
    faces = '<span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span>'
  } else if (rating === 1) {
    faces = '<span id="faces"><i class="far fa-angry"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span>'
  } else if (rating === 2) {
    faces = '<span id="faces"><i class="far fa-frown"></i></span><span id="faces"><i class="far fa-frown"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span>'
  } else if (rating === 3) {
    faces = '<span id="faces"><i class="far fa-meh"></i></span><span id="faces"><i class="far fa-meh"></i></span><span id="faces"><i class="far fa-meh"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span>'
  } else if (rating === 4) {
    faces = '<span id="faces"><i class="far fa-grin-alt"></i></span><span id="faces"><i class="far fa-grin-alt"></i></span><span id="faces"><i class="far fa-grin-alt"></i></span><span id="faces"><i class="far fa-grin-alt"></i></span><span id="faces"><i class="far fa-meh-blank"></i></span>'
  } else {
    faces = '<span id="faces"><i class="far fa-grin-stars"></i></span><span id="faces"><i class="far fa-grin-stars"></i></span><span id="faces"><i class="far fa-grin-stars"></i></span><span id="faces"><i class="far fa-grin-stars"></i></span><span id="faces"><i class="far fa-grin-stars"></i></span>'
  }
  return faces;
}

let showFaces;
//Función para mostrar los comentarios
function showComments(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let comment = array[i];
    let showFaces = comment.score;
    htmlContentToAppend += `
            <div class="card mb-2">
                <div class="d-block">
                    <div class="card-header align-user w-100">
                    <div class="col m-0 pl-0" id="user-comment">`+ comment.user + '</div><div class="col text-right"> Calificación: ' + ratingFaces(showFaces) + `</div>
                    </div>
                </div>
                <div class="card-body ">
                    <blockquote class="blockquote mb-0">
                    <div class="blockquote-footer text-right m-0">`+ comment.dateTime + `</div>
                    <p class="p-comment">"`+ comment.description + `"</p>
                    </blockquote>
                </div>
            </div>
            `
    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
  }
}
//Cargo los comentarios predeterminados en un JSON
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
  if (resultObj.status === "ok") {
    commentArray = resultObj.data;
  }
  showComments(commentArray);
})
//display propierty (display:none) ver esto para ocultar la pestaña activa y mostrar la otra

//arreglo.push(nuevoElemento);


//Función para mostrar las preguntas
//Crear array estilo JSON para las preguntas
/*function showComments(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let comment = array[i];
    let showFaces = comment.score;
    htmlContentToAppend += `
            <div class="card mb-2">
                <div class="d-block">
                    <div class="card-header align-user w-100">
                    <div class="col m-0 pl-0" id="user-question">`+ comment.user + '</div><div class="col text-right"> Calificación: ' + ratingFaces(showFaces) + `</div>
                    </div>
                </div>
                <div class="card-body ">
                    <blockquote class="blockquote mb-0">
                    <div class="blockquote-footer text-right m-0">`+ comment.dateTime + `</div>
                    <p class="p-comment">"`+ comment.description + `"</p>
                    </blockquote>
                </div>
            </div>
            `
    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
  }
}*/