/**
 * Navigation
 */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUrl = urlParams.get('p');
const contentDiv = $('#content');

var contentData = [
    './home.html',
    '../shop.html',
    './cart.html'
];

$('#header').load('./header.html');
$('#footer').load('./footer.html');

$(document).ready(function(){
    if (idUrl == null || idUrl == 'inicio') {
        //$('#content').load('./home.html');
        loadContent(0,'inicio');
    } else if (idUrl == 'tienda') {
        //$('#content').load('./shop.html');
        loadContent(1,'tienda');
    } else if (idUrl == 'carrito') {
        loadContent(2,'carrito');
        //$('#content').load('./cart.html');
    }
});

function loadContent(id,page) {
    contentDiv.load(contentData[id], function() {    
        loadFinish(4,page);
        if (page == 'carrito') {
            cartPageTable();
        };
    });
    let newQuery = '/?p='+page;
    window.history.pushState('', page, newQuery);
    
};

/**
 * Load products in shop page
 */
function loadFinish(q,p) {
var totalQty = dataProductos.length;
if (p == 'inicio') {
    var totalQty = q;
 //   console.log('el valor de qty se cambio a'+q);
}
for(let p=0; p<totalQty; p++){
    //console.log(dataProductos[p].id);
    var precioOriginal = dataProductos[p].precio;
    var precioNuevo = precioOriginal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    $("#product-list").append(`<div class="card is-shady block">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="../img/products/${dataProductos[p].imagen}" alt="Placeholder image" class="modal-button" data-target="modal-image2">
            </figure>
            </div>
            <div class="card-content">
            <div class="content">
                <h4>${dataProductos[p].nombre}</h4>
                <h3>S/. ${precioOriginal}</h3>
                <span class="button is-link" onclick="addToCart('${dataProductos[p].id}',1);">Agregar al carrito</span>
            </div>
            </div>
        </div>`);
    }
};

/**
 * Cart
 */

var cartContent = [];

function addToCart(idProduct,q) {
    var productSearch = dataProductos.find(p => p.id === idProduct);
    //console.log(productSearch);
    var cartIndex = cartContent.findIndex((obj => obj.id == idProduct));
    //console.log(cartIndex);

    if (cartIndex >= 0) {
        cartContent[cartIndex].qty = cartContent[cartIndex].qty+1;
        //console.log(cartContent);
    } else {
        var cartItem = {
            id: productSearch.id,
            nombre: productSearch.nombre,
            precio: productSearch.precio,
            qty: q
        };
        cartContent.push(cartItem);
        //console.log(cartContent);
    }
    $('#qty-number').html(cartContent.length);
    openMini();
    setTimeout(function(){
        openMini();
    }, 2000);

    /**
     * Mini cart items load
     */
     $("#mini-cart-list").empty();
     for(let m=0; m<cartContent.length; m++){
        let itemM = cartContent[m];
        //console.log(dataProductos[p].id);
        //var precioOriginal = dataProductos[p].precio;
        //var precioNuevo = precioOriginal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $("#mini-cart-list").append(`
            <tr>
            <td>${itemM.nombre}</td>
            <td>${itemM.precio}</td>
            <td>${itemM.qty}</td>
            </tr>
      `);
    }

    
};

function openMini() {
    $('#mini-cart-content').slideToggle();
};

function cartPageTable() {
    $("#cart-page-list").empty();
     for(let m=0; m<cartContent.length; m++){
        let itemM = cartContent[m];
        //console.log(dataProductos[p].id);
        //var precioOriginal = dataProductos[p].precio;
        //var precioNuevo = precioOriginal.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $("#cart-page-list").append(`
            <tr>
            <td>${itemM.nombre}</td>
            <td>${itemM.precio}</td>
            <td>${itemM.qty}</td>
            </tr>
      `);
    }
};