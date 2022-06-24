$.when($.ready).then(function () {
  seccionesMyAccount();
});

function seccionesMyAccount() {
  $("#idPedidos").on("click", function () {
    $("#secMispedidos").show();
    $("#secDireccion").hide();
    $("#secPassword").hide();
    $("#secClose").hide();
  });

    $("#idDireccion").on("click", function () {
      $("#secMispedidos").hide();
      $("#secDireccion").show();
      $("#secPassword").hide();
      $("#secClose").hide();
    });

    $("#idPassword").on("click", function () {
      $("#secMispedidos").hide();
      $("#secDireccion").hide();
      $("#secPassword").show();
      $("#secClose").hide();
    });

    $("#idClose").on("click", function () {
      $("#secMispedidos").hide();
      $("#secDireccion").hide();
      $("#secPassword").hide();
      $("#secClose").show();
    });
}
