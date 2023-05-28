// Variables globales

const user = document.getElementById("user");
const contrasena = document.getElementById("contrasena");

let users = [];

// Funcion para obtener los usuarios de una API

const getUsers = () => {
     fetch('http://localhost:3000/users')
          .then((response) => response.json())
          .then((data) => {
               users = data;
          })
          .catch((error) => alert(error));
}

// Capturar el formulario y enviar el id del usuario si existe
document.getElementById("form-login").addEventListener("submit", function (event) {
     event.preventDefault(); // Evitar que se envíe el formulario por defecto

     // Validar si el usuario existe
     const username = user.value;
     const password = contrasena.value;

     const foundUser = users.find((u) => (u.user === username || u.email === username) && u.password === password);

     if (foundUser) {
          // Redirigir a otra página con los datos incluidos en la URL
          let url = "profile.html" + "?user=" + encodeURIComponent(username);
          window.location.href = url;
     } else {
          alert("Usuario y/o contraseña incorrectos");
     }
});
// MAIN

getUsers();