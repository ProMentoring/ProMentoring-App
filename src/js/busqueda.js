// Variables globales de los objetos 
const mentorsList = document.getElementById("mentorsList");
const checkboxGroup = document.querySelectorAll(".checkbox-group input[type='checkbox']");
const precioMenorInput = document.querySelector("#precio-menor");
const precioMayorInput = document.querySelector("#precio-mayor");

// Variables para el link a cada pagina
const sesionLink = document.getElementById('sesion-link');
const calendarLink = document.getElementById('calendar-link');
const profileLink = document.getElementById('profile-link');

// Variables globales para el forms
precioMenorInput.addEventListener("input", () => fetchMentors());
precioMayorInput.addEventListener("input", () => fetchMentors());

const selectedFilters = [];
let mentors = [];

const fetchMentors = () => {
  fetch("http://localhost:3000/mentors")
    .then((response => response.json()))
    .then(data => {
      mentors = data;
      filterMentorsAndShow();
    })
    .catch((error) => console.error("Error", error));
}

const showMentors = (mentors) => {
  // Vaciar el contenido actual de la lista de mentores
  mentorsList.innerHTML = "";

  mentors.forEach(mentor => {
    // Crear el elemento <article> para el mentor
    const mentorArticle = document.createElement("article");
    mentorArticle.classList.add("mentor");

    // Crear el contenedor de fila para el contenido del mentor
    const mentorContainerRow = document.createElement("div");
    mentorContainerRow.classList.add("container-row");
    mentorContainerRow.classList.add("mentor-content");

    // Crear la imagen del mentor
    const mentorImagen = document.createElement("img");
    mentorImagen.src = mentor.photo;
    mentorImagen.alt = "No hay imagen";

    // Crear el contenedor de columna para los elementos del mentor
    const mentorContainerColumn = document.createElement("div");
    mentorContainerColumn.classList.add("container-col");
    mentorContainerColumn.classList.add("mentor-items");

    // Crear el nombre del mentor
    const mentorName = document.createElement("h3");
    mentorName.textContent = mentor.names;

    // Crear la especialidad del mentor
    const mentorSpeciality = document.createElement("p");
    mentorSpeciality.textContent = mentor.speciality;

    // Crear el contenedor de fila para los iconos del mentor
    const mentorContainerIcons = document.createElement("div");
    mentorContainerIcons.classList.add("container-row");
    mentorContainerIcons.classList.add("icons");

    // Agregar cada icono del mentor al contenedor de iconos
    mentor.icons.forEach(icon => {
      const mentorIcon = document.createElement("i");
      mentorIcon.classList.add("fa-brands");
      mentorIcon.classList.add(icon);
      mentorIcon.classList.add("fa-beat");
      mentorIcon.classList.add("fa-lg");
      mentorContainerIcons.append(mentorIcon);
    });

    // Agregar los elementos al árbol DOM
    mentorContainerColumn.appendChild(mentorName);
    mentorContainerColumn.appendChild(mentorSpeciality);
    mentorContainerColumn.appendChild(mentorContainerIcons);

    mentorContainerRow.appendChild(mentorImagen);
    mentorContainerRow.appendChild(mentorContainerColumn);

    mentorArticle.appendChild(mentorContainerRow);

    mentorsList.appendChild(mentorArticle);
  });
}

const filterMentorsAndShow = () => {
  // Convierte los filtros seleccionados a minúsculas
  const lowerCaseFilters = selectedFilters.map(filtro => filtro.toLowerCase());
  //convertir a valores enteros los precios
  const minPrice = parseInt(precioMenorInput.value);
  const maxPrice = parseInt(precioMayorInput.value);

  //Filtra los mentores
  const filteredMentors = mentors.filter(mentor => {
    // Comprueba si hay coincidencia en las habilidades
    const matchedSkills = mentor.skills.some(skill =>
      lowerCaseFilters.includes(skill.toLowerCase())
    );
    // Comprueba si hay coincidencia en las modalidades
    const matchedModalities = mentor.modalities.some(modality =>
      lowerCaseFilters.includes(modality.toLowerCase())
    );
    // Comprueba si hay coincidencia en el rango de precios
    const matchedPrice = mentor.price >= minPrice && mentor.price <= maxPrice;

    // Devuelve true si hay coincidencia en habilidades, modalidades o precios
    return matchedSkills || matchedModalities || matchedPrice;
  });
  //Muestra los mentores filtrados
  showMentors(filteredMentors);
}

const addCheckboxEventListener = () => {
  checkboxGroup.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      // Si el checkbox está seleccionado, se agrega a la lista de filtros seleccionados
      if (checkbox.checked) {
        selectedFilters.push(checkbox.value);
      }
      // Si el checkbox se deselecciona, se remueve de la lista de filtros seleccionados
      else {
        const index = selectedFilters.indexOf(checkbox.value);
        selectedFilters.splice(index, 1);
      }
      // Llama a la función para obtener los mentores filtrados
      fetchMentors();
    });
  });
}

const redirectToMentorPage = (mentorArticle) => {
  // Se obtiene el nombre del mentor del elemento h3 dentro del artículo
  const mentorName = mentorArticle.querySelector("h3").textContent;
  // Redirige a la página del mentor pasando su nombre como parámetro en la URL
  window.location.href = "reviews.html" + "?name=" + encodeURIComponent(mentorName) +
    "&user=" + encodeURIComponent(user) +
    "&rol=" + encodeURIComponent(type);
};

const addClickEventToMentors = () => {
  mentorsList.addEventListener("click", event => {
    // Verifica si se hizo clic en un artículo
    if (event.target.closest(".mentor")) {
      // Accede al artículo en el que se hizo clic
      const mentorArticle = event.target.closest(".mentor");
      // Redirige a la página del mentor
      redirectToMentorPage(mentorArticle);
    }
  });
};

//--- Ejecucion 

// Leer los valores de usuario de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
let type = urlParams.get("rol");
console.log("Usuario: " + user);
console.log("Type: " + type);

// Funcion de enviar data a la pagina sesion
sesionLink.href = "sesion.html" + "?user=" + encodeURIComponent(user)
  + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina calendario
calendarLink.href = "calendar.html" + "?user=" + encodeURIComponent(user)
  + "&rol=" + encodeURIComponent(type);

// Funcion de enviar data a la pagina de perfil
profileLink.href = "profile.html" + "?user=" + encodeURIComponent(user)
  + "&rol=" + encodeURIComponent(type);

// Funciones para agregar eventos
addCheckboxEventListener();
addClickEventToMentors();