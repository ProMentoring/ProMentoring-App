const selectMentor = document.getElementById("mentor_list");
const inputReview = document.getElementById("send-review");

// Variables para el link a cada pagina
const busquedaLink = document.getElementById('busqueda-link');
const sesionLink = document.getElementById('sesion-link');
const calendarLink = document.getElementById('calendar-link');
const profileLink = document.getElementById('profile-link');

//Obtención de parametros
let urlparameters = new URLSearchParams(window.location.search);
let mentores = [];
let users = [];
let objectMentor;
let objectReview;

const getMentors = () => {
    fetch("http://localhost:3000/mentors")
        .then(response => response.json())
        .then(data => {
            mentores = data;
            addMentor();
        })
        .catch(err => console.error("Error", err));
}

const addMentor = () => {
    for (var i = 0; i < mentores.length; ++i) {
        var option = document.createElement("option");
        option.textContent = mentores[i].names + " " + mentores[i].lastname;
        option.classList.add("mentors");
        console.log(option);
        selectMentor.appendChild(option);
    }
}

function capitalizeInitials(str) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
        return char.toUpperCase();
    });
}

function getObjectMentor() {
    for (var i = 0; i < mentores.length; i++) {
        if (selectMentor.value === (mentores[i].names + " " + mentores[i].lastname))
            return mentores[i];
    }
}
const saveUsers=()=>{
    fetch("http://localhost:3000/students")
        .then(response => response.json())
        .then(data => {
            users=data;
        })
        .catch(err => console.error("Error", err));
}

function getUser(username){
    saveUsers();
    for(var i = 0; i < users.length; ++i){
        if(users[i].user===username)return users[i];
    }
}

inputReview.addEventListener("click", function (event) {
    var userData = getUser(urlparameters.get("user"));
    console.log(userData.names + " " + userData.lastname);
    var name = capitalizeInitials(userData.names);
    var lastname = capitalizeInitials(userData.lastname);
    var score = document.getElementById("score");
    var note = Number(score.value);
    var commit = document.getElementById("Textarea").value;
    objectMentor = getObjectMentor();
    objectReview = {
        name: name,
        lastname: lastname,
        score: note,
        review: commit
    };
    // console.log(objectReview);
    console.log(objectMentor);
    objectMentor.Reseñas.push(objectReview);
    fetch("http://localhost:3000/mentors/" + objectMentor.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objectMentor)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Reseña registra: ", data);
            window.location.href = "reviews.html" + "?name=" + encodeURIComponent(objectMentor.names) +
                "&user=" + encodeURIComponent(user) +
                "&rol=" + encodeURIComponent(type);
        })
        .catch(err => console.error("Error", error));
});

//--- Ejecucion 

// Leer los valores de usuario de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let type = urlParams.get("rol");
console.log("Usuario: " + user);
console.log("Type: " + type);

// Funcion de enviar data a la pagina de busqueda
busquedaLink.href = "busqueda.html" + "?user=" + encodeURIComponent(user)
    + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina sesion
sesionLink.href = "sesion.html" + "?user=" + encodeURIComponent(user)
    + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina calendario
calendarLink.href = "calendar.html" + "?user=" + encodeURIComponent(user)
    + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina perfil
profileLink.href = "profile.html" + "?user=" + encodeURIComponent(user)
    + "&rol=" + encodeURIComponent(type);

getMentors();