//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {});
var categoriesArray = [];

function showCategoriesList(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let category = array[i];

    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      category.imgSrc +
      `" alt="` +
      category.description +
      `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` +
      category.name +
      `</h4>
                        <small class="text-muted">` +
      category.soldCount +
      ` artículos</small>
                    </div>
                    <div>
                        <p>` +
      category.description +
      `</p> 
                    </div>
                    <div>
                        <p>` +
      "USD " +
      category.cost +
      `</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    document.getElementById(
      "cat-list-container"
    ).innerHTML = htmlContentToAppend;
  }
}

//se creó un div nuevo en la linea 20  y allí entre etiquetas p se agregó el "category.description".
//se creó un div nuevo en la linea 24  y allí entre etiquetas p se agregó el "category.cost".

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  showSpinner(); //se muestra el spinner antes de cargar el json

  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      categoriesArray = resultObj.data;
      //Muestro las categorías ordenadas
      showCategoriesList(categoriesArray);
    }
    hideSpinner(); //el hide se pone por fuera del if ya que en caso de cualquier respuesta, se oculta; si estuviera adentro del if, solo se ocultaria con una respuesta "ok".
  });
});
