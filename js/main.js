/**
 * Navigation
 */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idUrl = urlParams.get('p');
const contentDiv = $('#content');

var contentData = [
    './home.html',
    './shop.html',
    './cart.html',
    './checkout.html',
    './myaccount.html',
    './login.html'
];

$('#header').load('./header.html');
$('#footer').load('./footer.html');

var loggedStatus = false;
var loggedUser = {
    username: '',
    email: ''
};

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
    } else if (idUrl == 'pagar') {
        loadContent(3,'pagar');
        //$('#content').load('./cart.html');
    } else if (idUrl == 'micuenta') {
        loginValidate(4,'micuenta');
    } else if (idUrl == 'login') {
        loginValidate(5,'login')
    }
});

function loginValidate(url,name) {
    if (loggedStatus == false) {
        loadContent(5,'login');
    } else {
        loadContent(4,'micuenta');
    }
};

function logout () {
    loggedStatus = false;
    loadContent(5,'login');
}

function loginProcess() {
    var userfield = $('#usuario').val();
    var passwordfield = $('#password').val();
    console.log('usuario: '+userfield+' | contraseña: '+passwordfield);
    userExist = usuarios.find(u => u.username === userfield);
    console.log(userExist);
    if (userExist != undefined) {
        console.log('si existe');
        if (userExist.password != passwordfield) {
            alert('contraseña incorrecta');
        } else {
            loggedStatus = true;
            loggedUser.username = userExist.username;
            loggedUser.email = userExist.email;
            loadContent(4,'micuenta');
        }
    } else {
        alert('Usuario no existe');
    }
    
};

function loadContent(id,page) {
    contentDiv.load(contentData[id], function() {    
        loadFinish(4,page);
        if (page == 'carrito') {
            cartPageTable();
            finalCost();
        } else if (page == 'pagar') {
            finalCost();
            formCheckout();
            radioEnvio();
        } else if (page == 'micuenta') {
            $('#current-username').text(loggedUser.username);
        };
    });
    let newQuery = '/Alpha-Store/?p='+page;
    //let newQuery = '/?p='+page;
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
                <img src="./img/products/${dataProductos[p].imagen}" alt="Placeholder image" class="modal-button" data-target="modal-image2">
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
 * Cart data
 */

var cartContent = [];

function addToCart(idProduct,q) {
    var productSearch = dataProductos.find(p => p.id === idProduct);
    //console.log(productSearch);
    var cartIndex = cartContent.findIndex((obj => obj.id == idProduct));
    //console.log(cartIndex);

    if (cartIndex >= 0) {
        cartContent[cartIndex].qty = cartContent[cartIndex].qty+1;
        cartContent[cartIndex].precio = cartContent[cartIndex].precio*cartContent[cartIndex].qty;

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
    //openMini();
    $('#mini-cart-content').slideDown();
    setTimeout(function(){
        $('#mini-cart-content').slideUp();
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

var totalTable = {
    subtotal: 0,
    igv: 0,
    descuento: 0,
    envio: 0,
    total: 0

};
var discountMount = 0;
function cartPageTable() {
    $("#cart-page-list").empty();
    totalTable.subtotal = 0;
    subSuma = 0;
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
            <td></td>
            </tr>
        `);
        subSuma = subSuma+parseInt(itemM.precio);
    }
    totalTable.igv = (subSuma*18)/100;
    totalTable.subtotal = subSuma;
    
    totalTable.total = (totalTable.subtotal+totalTable.igv)-discountMount;
    

};

function finalCost() {
    $('#sub-cell').text(totalTable.subtotal);
    $('#igv-cell').text(totalTable.igv);
    $('#total-cell').text(totalTable.total);
    $('#envio-cell').text(totalTable.envio);
    $('#discount-cell').text('- '+totalTable.descuento);
}

var discountObj = {};

function applyDiscount() {
    var search = $('#campo-descuento').val();
    console.log(search);
    discountObj = dataCupones.find(c => c.codigo === search);
    console.log(discountObj);
    subPrev = totalTable.subtotal+totalTable.igv;
    var discountMount = (subPrev*discountObj.descuento)/100;
    totalTable.total = (totalTable.subtotal+totalTable.igv)-discountMount;
    totalTable.descuento = discountMount;
    $('#discount-cell').text('- '+discountMount);
    $('#total-cell').text(totalTable.total);

}

//var costFind = {};
function formCheckout() {
    //shippingCost();
    $("#select-departamento").empty();
    for(let z=0; z<departamentos.length; z++){
        $("#select-departamento").append(`
            <option value="${departamentos[z].id}">${departamentos[z].nombre}</option>
        `);
    };
    
    var valDepartamento = $("#select-departamento").val();
    var proviciaFind = provincias.filter(p => p.departamento === valDepartamento);
    
    for(let p=0; p<proviciaFind.length; p++){
        $("#select-provincia").append(`
            <option value="${proviciaFind[p].id}">${proviciaFind[p].nombre}</option>
        `);
    };
    var valProvincia = $("#select-provincia").val();
    var distritoFind = distritos.filter(d => d.provincia === valProvincia);
    for(let d=0; d<distritoFind.length; d++){
        $("#select-distrito").append(`
            <option value="${distritoFind[d].id}">${distritoFind[d].nombre}</option>
        `);
    };
    console.log(distritoFind);

    $("#select-departamento").change(function(){
        $("#select-provincia").empty();
        $("#select-distrito").empty();
        valDepartamento = $("#select-departamento").val();
        proviciaFind = provincias.filter(p => p.departamento === valDepartamento);
        //console.log(proviciaFind)
        //console.log('cambio');
        for(let p=0; p<proviciaFind.length; p++){
            $("#select-provincia").append(`
                <option value="${proviciaFind[p].id}">${proviciaFind[p].nombre}</option>
            `);
        }
        valProvincia = $("#select-provincia").val();
        distritoFind = distritos.filter(d => d.provincia === valProvincia);
        for(let d=0; d<distritoFind.length; d++){
            $("#select-distrito").append(`
                <option value="${distritoFind[d].id}">${distritoFind[d].nombre}</option>
            `);
        }
        shippingCost();
    });

    $("#select-provincia").change(function(){
        $("#select-distrito").empty();
        valProvincia = $("#select-provincia").val();
        distritoFind = distritos.filter(d => d.provincia === valProvincia);
        //console.log(distritoFind)
        //console.log('cambio');
        for(let d=0; d<distritoFind.length; d++){
            $("#select-distrito").append(`
                <option value="${distritoFind[d].id}">${distritoFind[d].nombre}</option>
            `);
        }
        shippingCost();
    });
    $("#select-distrito").change(function(){
        shippingCost();
    });
};

function shippingCost() {
    valDistrito = $("#select-distrito").val();
    console.log(shippingPrecio);
    var costFind = distritos.find(d => d.id === valDistrito);
    var shippingPrecio = costFind.precio;
    totalTable.envio = shippingPrecio;
    finalCost();
}

function radioEnvio(){ 
    $('input[name=tipoenvio]').change(function(){
        //alert('cambiaron');
        if (this.value == 'store') {
            console.log('tienda');
            $('#zona-envio').removeClass('visible');
        } else if (this.value == 'shipp') {
            console.log('envio');
            $('#zona-envio').addClass('visible');
        }
    });

};

/*$(document).ready(function(){ 
    $('input:radio[name=tipoenvio]').change(function(){
        var loquesea = this.value();
        alert(loquesea);
        var radio = $("input[name=tipoenvio]:cheked");
        var radioSingle = this.attr("id");
        alert('cambiaron');
        if (this.value == 'store') {
            alert('tienda');
        } else if (this.value == 'shipp') {
            alert('envio');
        }
    });

});*/