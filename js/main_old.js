const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUrl = urlParams.get('p');
const contentDiv = $('#content');

var contentData = [
    './home.html',
    './shop.html',
    './cart.html'
];

$('#header').load('./header.html');
$('#footer').load('./footer.html');

$(document).ready(function(){
    if (idUrl == null || idUrl == 'inicio') {
        $('#content').load('./home.html');
    } else if (idUrl == 'tienda') {
        $('#content').load('./shop.html',loadProducts());
    } else if (idUrl == 'carrito') {
        $('#content').load('./cart.html');
    }
});

function loadContent(id,page) {
    contentDiv.load(contentData[id], function() {    
        for(let p=0; p<dataProductos.length; p++){
            console.log(dataProductos[p].id);
            //var precioOriginal = InmuebleArray[i].precio;
            //var precioNuevo = precioOriginal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            //console.log(precioNuevo);
    
            $("#product-list").append(`<div class="card is-shady block">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="./img/products/${dataProductos[p].imagen}" alt="Placeholder image" class="modal-button" data-target="modal-image2">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h4>Titulo del producto</h4>
                <h3>Precio.</h3>
                <span class="button is-link">Agregar al carrito</span>
              </div>
            </div>
          </div>`);
        }
    });
    let newQuery = '/?p='+page;
    window.history.pushState('', page, newQuery);
    loadProducts();
};

/**
 * Load products in shop page
 */





function loadProducts() {    
    for(let p=0; p<dataProductos.length; p++){
        console.log(dataProductos[p].id);
        //var precioOriginal = InmuebleArray[i].precio;
        //var precioNuevo = precioOriginal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        //console.log(precioNuevo);

        $("#product-list").append(`<div class="card is-shady block">
        <div class="card-image">
            <figure class="image is-4by3">
            <img src="./img/products/${dataProductos[p].imagen}" alt="Placeholder image" class="modal-button" data-target="modal-image2">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
            <h4>Titulo del producto</h4>
            <h3>Precio.</h3>
            <span class="button is-link">Agregar al carrito</span>
            </div>
        </div>
        </div>`);
    }
}; 