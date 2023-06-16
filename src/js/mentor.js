// Almacenamiento de etiquetas 
const mentorDivImg = document.getElementById("mentor");
const mentorDivDescription = document.getElementById("presentación-mentor");
const reviewsDiv = document.getElementById("container-reviews");

// Variables para el link a cada pagina
const busquedaLinked = document.getElementById('busqueda-link');
const sesionLinked = document.getElementById('sesion-link');
const calendarLinked = document.getElementById('calendar-link');
const profileLinked = document.getElementById('profile-link');

let mentores = [];
var auxiliar;

const getMentors = () => {
    fetch("http://localhost:3000/mentors")
        .then(response => response.json())
        .then(data => {
            mentores = data;
            console.log(mentores);
            viewMentor();
        })
        .catch(err => console.error("Error", err));
}

const viewMentor = () => {
    const mentorView = mentores.find((m) => m.names === nameCapture);
    auxiliar = mentorView;
    console.log(mentorView);
    /* Carga de photo del mentor*/
    const img = document.createElement("img");
    img.id = "photo-mentor";
    img.src = mentorView.photo;
    img.alt = "NO IMAGE";
    mentorDivImg.appendChild(img);
    /* Carga del descripción del mentor */
    const nameM = document.createElement("h3");
    nameM.textContent = mentorView.names + " " + mentorView.lastname;
    mentorDivDescription.appendChild(nameM);

    const skillMentor = document.createElement("span");
    skillMentor.textContent = mentorView.skills[0];
    mentorDivDescription.appendChild(skillMentor);

    const textMentor = document.createElement("p");
    textMentor.textContent = mentorView.description;
    mentorDivDescription.appendChild(textMentor);


    /* Carga de reseñas sobre el mentor */
    mentorView.Reseñas.forEach((review) => {
        /* Creación del contenedor de reseñas*/
        const containerReview = document.createElement("div");
        containerReview.classList.add("reviews");
        /* Creación de autor de la reseña */
        const subDivH3 = document.createElement("h3");
        subDivH3.classList.add("name");
        subDivH3.textContent = review.name + " " + review.lastname;
        /* Creación del contenido de la reñas */
        const subDivP = document.createElement("p");
        subDivP.classList.add("commit");
        subDivP.textContent = review.review;
        /* Agregación al div contenedor de una reseña */
        containerReview.appendChild(subDivH3);
        containerReview.appendChild(subDivP);
        /* Agregación al div contenedor de las reseñas */
        reviewsDiv.appendChild(containerReview);
    });
}
//--- Ejecucion 

// Leer los valores de usuario de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let type = urlParams.get("rol");
let nameCapture = urlParams.get("name");
console.log("name: " + nameCapture);
console.log("Usuario: " + user);
console.log("Type: " + type);

// Funcion de enviar data a la pagina busqueda
busquedaLinked.href = "busqueda.html" + "?user=" + encodeURIComponent(user)
    + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina sesion
sesionLinked.href = "sesion.html" + "?user=" + encodeURIComponent(user)
    + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina calendario
calendarLinked.href = "calendar.html" + "?user=" + encodeURIComponent(user)
    + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina de perfil
profileLinked.href = "profile.html" + "?user=" + encodeURIComponent(user)
    + "&rol=" + encodeURIComponent(type);

getMentors();