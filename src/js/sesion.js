// Variables para el link a cada pagina
const busquedaLink = document.getElementById('busqueda-link');
const calendarLink = document.getElementById('calendar-link');
const profileLink = document.getElementById('profile-link');
const videoLink = document.getElementById('videoconferencia1');

// Leer los valores de usuario de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let type = urlParams.get("rol");
console.log("Usuario: " + user);
console.log("Type: " + type);

// Funcion de enviar data a la pagina de busqueda
busquedaLink.href = "busqueda.html" + "?user=" + encodeURIComponent(user)
     + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina de calendar
calendarLink.href = "calendar.html" + "?user=" + encodeURIComponent(user)
     + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina sesion
profileLink.href = "profile.html" + "?user=" + encodeURIComponent(user)
     + "&rol=" + encodeURIComponent(type);

videoLink.href = "video.html" + "?user=" + encodeURIComponent(user)
+ "&rol=" + encodeURIComponent(type);