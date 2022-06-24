//visualizar Password

const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');
 
  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

//Verificar las contraseñas

function verificarPasswords() {
 
  // Obtenemos los valores de los campos de contraseñas 
  password1 = document.getElementById('password');
  password2 = document.getElementById('password2');

  // Verificamos si las constraseñas no coinciden 
  if (password1.value != password2.value) {

      // Si las constraseñas no coinciden mostramos un mensaje 
      document.getElementById("error").classList.add("mostrar");

      return false;
  } else {

      // Si las contraseñas coinciden ocultamos el mensaje de error
      document.getElementById("error").classList.remove("mostrar");

      // Mostramos un mensaje mencionando que las Contraseñas coinciden 
      document.getElementById("ok").classList.remove("ocultar");

      // Desabilitamos el botón de login 
      document.getElementById("login").disabled = true;

  }

}