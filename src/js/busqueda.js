const mentorsList = document.getElementById("mentorsList");

let mentors = [];

const getMentors = ()=>{
    fetch("http://localhost:3000/mentors")
    .then((response => response.json()))
    .then(data => {
        mentors = data;
        //console.log(mentors);
        showMentors(mentors);
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
        mentorImagen.src = mentor.imagen;
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

const filterMentors = () =>{
    
}
getMentors(); 