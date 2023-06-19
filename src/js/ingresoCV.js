// Variables globales de los objetos 

const skillsBox = document.getElementById("skill-list");
// const boxes = skillsBox.querySelectorAll('input[type="checkbox"]');
const insertSkillInput = document.getElementById("insert-skills");
const insertButton = document.querySelector('.form-group button');
const infoDiv = document.getElementById('infoDiv');
const submitButton = document.getElementById('submit-info');

// Variables para el link a cada pagina
const busquedaLink = document.getElementById('busqueda-link');
const sesionLink = document.getElementById('sesion-link');
const calendarLink = document.getElementById('calendar-link');
const profileLink = document.getElementById('profile-link');

// Variables globales para el forms
const namesInput = document.getElementById('names');
const lastnameInput = document.getElementById('lastname');
const careerInput = document.getElementById('career');
const bioInput = document.getElementById('bio');

// Variable para obtener el usuario
let usersData = []
let userData = []

// ------------- Funciones 

const sendChangesData = () => {
     // Obtener el ID del usuario que deseas editar
     let url = "profile.html" + "?user=" + encodeURIComponent(user)
          + "&rol=" + encodeURIComponent(type);
     window.location.href = url;
}

submitButton.addEventListener('click', sendChangesData);

// ------------ Ejecucion
// Leer los valores de usuario de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let type = urlParams.get("rol");
console.log("Usuario: " + user);
console.log("Type: " + type);

// Funcion de enviar data a la pagina calendario
busquedaLink.href = "busqueda.html" + "?user=" + encodeURIComponent(user)
     + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina sesion
sesionLink.href = "sesion.html" + "?user=" + encodeURIComponent(user)
     + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina calendario
calendarLink.href = "calendar.html" + "?user=" + encodeURIComponent(user)
     + "&rol=" + encodeURIComponent(type);

     // Funcion de enviar data a la pagina de perfil
profileLink.href = "profile.html" + "?user=" + encodeURIComponent(user)
     + "&rol=" + encodeURIComponent(type);


// Agregar eventos de escucha
