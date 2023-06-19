// Obtener referencias a los elementos del DOM
const codeEditor = document.getElementById('code-editor');
const outputFrame = document.getElementById('output-frame');
const compileButton = document.getElementById('compile-button');
const outputMessages = document.getElementById('output-messages');

// Variables para el link a cada pagina
const busquedaLink = document.getElementById('busqueda-link');
const sesionLink = document.getElementById('sesion-link');
const calendarLink = document.getElementById('calendar-link');

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
//------------> Ejecucion 


// Leer los valores de usuario de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let type = urlParams.get("rol");
let nameCapture = urlParams.get("name");
console.log("name: " + nameCapture);
console.log("Usuario: " + user);
console.log("Type: " + type);

// Funcion de enviar data a la pagina busqueda
busquedaLink.href = "busqueda.html" + "?user=" + encodeURIComponent(user)
      + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina sesion
sesionLink.href = "sesion.html" + "?user=" + encodeURIComponent(user)
      + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina calendario
calendarLink.href = "calendar.html" + "?user=" + encodeURIComponent(user)
      + "&rol=" + encodeURIComponent(type);


// Agregar un evento de escucha al botón de compilación
compileButton.addEventListener('click', compileCode);

// Función para compilar el código y mostrar los mensajes de salida
function compileCode() {
      const code = codeEditor.value;

      // Aquí puedes realizar la lógica de compilación y obtener los mensajes de salida

      // Limpiar los mensajes de salida previos
      outputMessages.innerHTML = '';

      // Ejemplo de mensajes de salida
      const output = 'Compilación exitosa\n';
      const errors = 'Error en línea 5: variable no declarada\n';

      // Mostrar los mensajes de salida en el contenedor correspondiente
      outputMessages.innerHTML += '<pre>' + output + '</pre>';
      outputMessages.innerHTML += '<pre>' + errors + '</pre>';

      // Actualizar la salida en el iframe (puedes ajustarlo según tus necesidades)
      outputFrame.contentDocument.body.innerHTML = code;
}
