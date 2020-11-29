const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function showCategoriesList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let category = currentCategoriesArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(category.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(category.cost) <= maxCount))
    ) {
      htmlContentToAppend +=
        `
            <a href="product-info.html" class="list-group-item list-group-item-action" id="a-hover">
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
                        <p class="mb-1">` +
        category.description +
        `</p>
                        <h5> ` +
        category.currency +
        ` ` +
        category.cost +
        `</h5>
                    </div>
                </div>
            </a>
            `;
    }
    //mod:"cat-list.container" por "prod-list-container"
    document.getElementById(
      "cat-list-container"
    ).innerHTML = htmlContentToAppend;
  }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(
    currentSortCriteria,
    currentCategoriesArray
  );

  //Muestro las categorías ordenadas
  showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_NAME);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_PROD_COUNT);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showCategoriesList();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showCategoriesList();
    });
});

//Función para cargar el resultado del buscador o visualizar alerta de no coincidencia
function buscarProducto(aux) {
  let htmlContentToAppend = "";
  for (let producto of currentCategoriesArray) {
    let nombre = producto.name.toLowerCase();
    if (nombre.indexOf(aux) !== -1) {
      htmlContentToAppend +=
        `
      <a href="product-info.html" class="list-group-item list-group-item-action">
          <div class="row">
              <div class="col-3">
                  <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">`+ producto.name + `</h4>
                      <small class="text-muted">` + producto.soldCount + ` artículos</small>
                  </div>
                  <p class="mb-1">` + producto.description + `</p>
                  <h5> `+ producto.currency + ` ` + producto.cost + `</h5>
              </div>
          </div>
      </a>
      `
      document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
  }
  if (htmlContentToAppend === '') {



    htmlContentToAppend +=

      `
      </br>
      <div class="alert-danger mx-auto" style="width: 80%" role="alert">
      <h3 class="alert-heading m-2 text-center"><b>No hay coincidencias con tu búsqueda</b></h3>
      <hr>
      <ul class="alert-ul">
          <li>Revisa la ortografía de la palabra.</li>
          <li>Utiliza palabras más genéricas o menos palabras..</li>
      </ul>
      </div>
      `
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
  }

}


const buscador = document.querySelector('#p-search');
const boton = document.querySelector('#b-search');

const filtrar = () => {


  const texto = buscador.value.toLowerCase();

  if (texto !== '') {
    buscarProducto(texto);
  } else {
    showCategoriesList();
  }

}
boton.addEventListener('click', filtrar);
buscador.addEventListener("keyup", filtrar);
document.getElementById("p-search").value = "";
