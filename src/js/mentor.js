/* Almacenamiento de etiquetas */
const mentorDivImg = document.getElementById("mentor");
const mentorDivDescription = document.getElementById("presentación-mentor");
const reviewsDiv = document.getElementById("container-reviews");
/* Captura del nombre del mentor */
const nameCapture = decodeURI(window.location.search);
let nameFilter = nameCapture.substr(6);


let mentores = [];
var auxiliar;

const getMentors=()=>{
    fetch("http://localhost:3000/mentors")
    .then(response=>response.json())
    .then(data=>{
        mentores=data;
        console.log(mentores);
        viewMentor();
    })
    .catch(err=>console.error("Error",error));
}

const viewMentor=()=>{
    const mentorView = mentores.find((m)=>m.names == nameFilter);
    auxiliar=mentorView;
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

getMentors();