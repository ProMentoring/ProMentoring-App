const mentorsList = document.getElementById("mentorsList");
const checkboxGroup = document.querySelectorAll(".checkbox-group input[type='checkbox']");

const precioMenorInput = document.querySelector("#precio-menor");
const precioMayorInput = document.querySelector("#precio-mayor");
const precioMenor = parseInt(precioMenorInput.value);
const precioMayor = parseInt(precioMayorInput.value);

const filtrosSeleccionados = [];
let mentors = [];
const listFilterMentors = [];

const getMentors = ()=>{
    fetch("http://localhost:3000/mentors")
    .then((response => response.json()))
    .then(data => {
        mentors = data;
        //console.log(mentors);
        filterMentors(mentors, filtrosSeleccionados);
        //showMentorsFiltered(mentors, filtrosSeleccionados);
    })
    .catch((error) => console.error("Error", error));
}

const showMentors = (mentors) => {
    mentorsList.innerHTML = "";

    mentors.forEach(mentor => {
        const mentorArticle = document.createElement("article");
        mentorArticle.classList.add("mentor");

        const mentorContainerRow = document.createElement("div");
        mentorContainerRow.classList.add("container-row");
        mentorContainerRow.classList.add("mentor-content");

        const mentorImagen = document.createElement("img");
        mentorImagen.src = mentor.photo;
        mentorImagen.alt = "No hay imagen";

        const mentorContainerColumn = document.createElement("div");
        mentorContainerColumn.classList.add("container-col");
        mentorContainerColumn.classList.add("mentor-items");

        const mentorName = document.createElement("h3");
        mentorName.textContent = mentor.name;

        const mentorSpeciality = document.createElement("p");
        mentorSpeciality.textContent = mentor.speciality;

        const mentorContainerIcons = document.createElement("div");
        mentorContainerIcons.classList.add("container-row");
        mentorContainerIcons.classList.add("icons");

        //agregar cada icono del mentor
        mentor.icons.forEach(icon => {
            const mentorIcon = document.createElement("i");
            mentorIcon.classList.add("fa-brands");
            mentorIcon.classList.add(icon);
            mentorIcon.classList.add("fa-beat");
            mentorIcon.classList.add("fa-lg");
            //se agregan los iconos del mentor al container de iconos
            mentorContainerIcons.append(mentorIcon);
        });        

        mentorContainerColumn.appendChild(mentorName);
        mentorContainerColumn.appendChild(mentorSpeciality);
        mentorContainerColumn.appendChild(mentorContainerIcons);

        mentorContainerRow.appendChild(mentorImagen);
        mentorContainerRow.appendChild(mentorContainerColumn);

        mentorArticle.appendChild(mentorContainerRow);
        
        mentorsList.appendChild(mentorArticle);
    });
}

const filterMentors = (mentors, filtros) => {
    //Filtro por skill
    mentors.forEach(mentor => {
        let mentorMatched = false; // Variable para realizar un seguimiento de si se encontró una coincidencia para el mentor actual

        mentor.skills.forEach(skill => {
            filtros.forEach(filtro => {
                if (skill.toLowerCase() === filtro.toLowerCase()) {
                    listFilterMentors.push(mentor);
                    mentorMatched = true; // Se encontró una coincidencia para el mentor actual
                    return; // Romper el bucle interno
                }
            });

            if (mentorMatched) {
                return; // Romper el bucle externo si ya se encontró una coincidencia para el mentor actual
            }
        });

        //if(mentor.modality.toLowerCase() === 
    });
    showMentors(listFilterMentors);
}

const getFiltros = () =>{
    checkboxGroup.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                filtrosSeleccionados.push(checkbox.value);
            } else {
                const index = filtrosSeleccionados.indexOf(checkbox.value);
                filtrosSeleccionados.splice(index, 1);
            }

            getMentors(mentors, filtrosSeleccionados);
        });
    });


}
getFiltros()