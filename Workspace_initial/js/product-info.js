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

    }
    showRelatedProducts(product.relatedProducts);
  });
});

function showRelatedProducts(array) {

  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let relatedProducts = array[i];

    htmlContentToAppend += `
      <div class="col-lg-3 col-md-4 col-6">
          <div class="d-block mb-4 w-100">
              <a href="product-info.html"> <img class="img-fluid img-thumbnail" src="img/car` + relatedProducts + `.jpg" alt=""></a>
          </div>
      </div>
      `

    document.getElementById("productRelatedProducts").innerHTML = htmlContentToAppend;
  }
}

//Función que crea el rating de "estrellas" para la calificación (es temporal para este Entregable, luego lo cambio al de "caritas").

function ratingStars(rating) {
  let stars;
  if (rating === 0) {
    stars = '<span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span>'
  } else if (rating === 1) {
    stars = '<span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span>'
  } else if (rating === 2) {
    stars = '<span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span>'
  } else if (rating === 3) {
    stars = '<span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span>'
  } else if (rating === 4) {
    stars = '<span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOff"><i class="fas fa-star"></i></span>'
  } else if (rating === 5) {
    stars = '<span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span><span id="starsOn"><i class="fas fa-star"></i></span>'
  }
  return stars;
}


//Funcion que crea el rating de "caritas" para la calificación
//rating = 0; Face:"meh-blank";
//rating = 1; Face:"angry";Text:"Muy malo"
//rating = 2; Face:"frown";Text:"Malo"
//rating = 3; Face:"meh";Text:"Aceptable"
//rating = 4; Face:"grin-alt";Text:"Muy bueno"
//rating = 5; Face:"grin-stars";Text:"Excelente"
/*function ratingFaces(rating) {
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
}*/

let showStars;
//Función para mostrar los comentarios
function showComments(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let comment = array[i];
    let showStars = comment.score;
    htmlContentToAppend += `
            <div class="card mb-2">
                <div class="d-block">
                    <div class="card-header align-user w-100">
                    <div class="col m-0 pl-0" id="user-comment">`+ comment.user + '</div><div class="col text-right"> Calificación: ' + ratingStars(showStars) + `</div>
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
  showComments(commentArray);//los guardo en mi función para usarlos luego.
})

//arreglo.push(nuevoElemento);

//Función para mostrar las preguntas...
//cuando el documento este cargado..
$(document).ready(function () {
  $('.t-comentarios a:first').addClass('active');
  $('#seccion-2').hide();
  $('#seccion-1').show();

  $('.t-comentarios a').click(function () {
    $('.t-comentarios a').removeClass('active');
    $(this).addClass('active');
    $('.seccion-comentarios section').hide();

    var activeTab = $(this).attr('href');
    $(activeTab).show();
    return false;
  });
});