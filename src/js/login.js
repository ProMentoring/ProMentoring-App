// Variables globales

const user = document.getElementById("user");
const contrasena = document.getElementById("contrasena");

// Variable para obtener los usuarios existentes
let students = []
let mentors = []
let users = [];

// Funcion para obtener los usuarios de una API
const getUsers = () => {
     fetch('http://localhost:3000/students')
          .then((response) => response.json())
          .then((data) => {
               students = data;
               users = students;
          })
          .catch((error) => alert(error));
     fetch('http://localhost:3000/mentors')
          .then((response) => response.json())
          .then((data) => {
               mentors = data;
               mentors.forEach((mentor) => users.push(mentor));
          })
          .catch((error) => alert(error));
}

// Capturar el formulario y enviar el id del usuario si existe
document.getElementById("form-login").addEventListener("submit", function (event) {
     event.preventDefault(); // Evitar que se envíe el formulario por defecto

     // Validar si el usuario existe
     const username = user.value;
     const password = contrasena.value;
     const foundUser = users.find((u) => (u.user === username || u.email === username)
          && u.password === password);

     if (foundUser) {
          // Validamos el rol del usuario
          let rol = 'students';
          if (foundUser.career == undefined) {
               rol = 'mentors';
          }

          // Redirigir a otra página con los datos incluidos en la URL
          let url = "profile.html" + "?user=" + encodeURIComponent(username) + "&rol=" + encodeURIComponent(rol);
          window.location.href = url;
     } else {
          alert("Usuario y/o contraseña incorrectos");
     }
});

// MAIN
getUsers();