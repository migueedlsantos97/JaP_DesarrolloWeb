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

      //Muestro las imagenes en forma de galería
      showImagesGallery(product.images);
      //Muestro imagenes de los productos relacionados
      showRelatedProducts(product.relatedProducts);
    }
  });
});

//Agregué la función para mostrar los comentarios
function showComments(array) {
  for (let i = 0; i < array.length; i++) {
    let comment = array[i];
    let score = "";
    for (let i = 1; i < comment.score; i++) {
      score += `<span class="fa fa.star" id="starUnchecked"></span>`
    }
    htmlContentToAppend += `
      <hr class ="my-3">
      <div>
      <span> `+ score + `</span>
      <p> `+ comment.description + `</p>
      <p> `+ `Publicado el ` + comment.dataTime + `</p>
      </div>
      `

    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
  }
}
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
  if (resultObj.status === "ok") {
    commentArray = resultObj.data;
  }
  showComments(commentArray);
})