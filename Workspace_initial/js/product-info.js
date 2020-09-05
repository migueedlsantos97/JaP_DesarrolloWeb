var product = {};

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend +=
      `
            <li data-thumb="` +
      imageSrc +
      `">
                <a href="` +
      imageSrc +
      `" data-fancybox="gallery">
                    <img class="img-prod-info" src="` +
      imageSrc +
      `" />
                </a>
            </li>
        `;

    document.getElementById(
      "productImagesGallery"
    ).innerHTML = htmlContentToAppend;
  }
}

function showRelatedProducts(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let relatedProducts = array[i];

    htmlContentToAppend +=
      `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 w-100">
                <a href="product-info.html"> <img class="img-fluid img-thumbnail" src="img/car` +
      relatedProducts +
      `.jpg" alt=""></a>
            </div>
        </div>
        `;

    document.getElementById(
      "productRelatedProducts"
    ).innerHTML = htmlContentToAppend;
  }
}
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
