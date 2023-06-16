// Variables globales de los objetos 
const photoDiv = document.getElementById('photo');
const skillsBox = document.getElementById("skill-list");
const boxes = skillsBox.querySelectorAll('input[type="checkbox"]');
const insertSkillInput = document.getElementById("insert-skills");
const insertButton = document.querySelector('.form-group button');
const infoDiv = document.getElementById('infoDiv');
const submitButton = document.getElementById('submit-info');
const sectionInfo = document.getElementById("info-user");

// Variables para el link a cada pagina
const busquedaLink = document.getElementById('busqueda-link');
const sesionLink = document.getElementById('sesion-link');

// Variables globales para el forms
const namesInput = document.getElementById('names');
const lastnameInput = document.getElementById('lastname');
const careerInput = document.getElementById('career');
const bioInput = document.getElementById('bio');
const linkInput = document.getElementById('link');

// Variable para obtener el usuario
let usersData = []
let userData = []
let students = []
let mentors = []

// ------------- Funciones 

// Funcion para los nombres formato
function capitalizeInitials(str) {
     return str.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
          return char.toUpperCase();
     });
}

// Funcion para obtener los usuarios de una API
const getUsers = () => {
     fetch('http://localhost:3000/students')
          .then((response) => response.json())
          .then((data) => {
               students = data;
               usersData = students;
          })
          .catch((error) => alert(error));
     fetch('http://localhost:3000/mentors')
          .then((response) => response.json())
          .then((data) => {
               mentors = data;
               mentors.forEach((mentor) => usersData.push(mentor));
               userData = usersData.find((data) => data.user === user);
               console.log("Usuario: ", userData);
               if (type === 'students') loadDataStudent();
               else loadDataMentor();
               loadPhoto();
          })
          .catch((error) => alert(error));
}

// Funcion para cargar los datos de los estudiantes
const loadDataStudent = () => {
     // Creacion de los componentes
     const names = document.createElement('h2');
     names.innerText = userData.names + " " + userData.lastname;

     const rol = document.createElement('p');
     rol.innerText = capitalizeInitials(type);

     const career = document.createElement('h3');
     career.innerText = userData.career;

     const description = document.createElement('p');
     description.innerText = userData.description;

     const skillTitle = document.createElement('h3');
     skillTitle.innerText = 'Habilidades';

     const skillsList = document.createElement('ul');

     // Verificar si el array de habilidades está vacío
     if (userData.skills.length === 0) {
          const noSkills = document.createElement('li');
          noSkills.innerText = 'No se han agregado habilidades.';
          skillsList.appendChild(noSkills);
     } else {
          // Recorrer el array de habilidades y crear elementos <li> para cada una
          userData.skills.forEach((skill) => {
               const skills = document.createElement('li');
               skills.innerText = skill;
               skillsList.appendChild(skills);
          });
     }

     // Se agregan al element infoDiv 
     infoDiv.appendChild(names);
     infoDiv.appendChild(rol);
     infoDiv.appendChild(career);
     infoDiv.appendChild(description);
     infoDiv.appendChild(skillTitle)
     infoDiv.appendChild(skillsList);

     // Carga los datos en el forms
     loadFormsDataStudent();
};

// Funcion para cargar los datos de los mentores
const loadDataMentor = () => {
     // Creacion de los componentes
     const names = document.createElement('h2');
     names.innerText = userData.names + " " + userData.lastname;

     const rol = document.createElement('p');
     rol.innerText = capitalizeInitials(type);

     const speciality = document.createElement('h3');
     speciality.innerText = userData.speciality;

     const description = document.createElement('p');
     description.innerText = userData.description;

     const skillTitle = document.createElement('h3');
     skillTitle.innerText = 'Habilidades';

     const skillsList = document.createElement('ul');

     // Verificar si el array de habilidades está vacío
     if (userData.skills.length === 0) {
          const noSkills = document.createElement('li');
          noSkills.innerText = 'No se han agregado habilidades.';
          skillsList.appendChild(noSkills);
     } else {
          // Recorrer el array de habilidades y crear elementos <li> para cada una
          userData.skills.forEach((skill) => {
               const skills = document.createElement('li');
               skills.innerText = skill;
               skillsList.appendChild(skills);
          });
     }

     // Se agregan al element infoDiv 
     infoDiv.appendChild(names);
     infoDiv.appendChild(rol);
     infoDiv.appendChild(speciality);
     infoDiv.appendChild(description);
     infoDiv.appendChild(skillTitle)
     infoDiv.appendChild(skillsList);

     // Se cargan los datos al forms
     loadFormsDataMentor();
};

//Funcion para cargar
const loadPhoto = () => {
     const photoUser = document.createElement('img');
     photoUser.src = userData.photo;
     photoUser.alt = "No hay imagen";
     photoDiv.appendChild(photoUser);
}

// Funcion para cargar la data del estudiante al forms
const loadFormsDataStudent = () => {

     // Se rellenan los campos del forms
     namesInput.value = userData.names;
     lastnameInput.value = userData.lastname;
     careerInput.value = userData.career;
     bioInput.value = userData.description;
     linkInput.value = userData.photo;

     // Se generan las habilidades en el forms
     userData.skills.forEach((skill) => {

          // Crear el elemento de checkbox
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = skill.toLowerCase().replace(/\s/g, '_');
          checkbox.name = 'skills';
          checkbox.value = capitalizeInitials(skill.toLowerCase().replace(/\s/g, ' '));

          // Crear la etiqueta del checkbox
          const label = document.createElement('label');
          label.htmlFor = skill.toLowerCase().replace(/\s/g, '_');
          label.textContent = capitalizeInitials(skill);

          // Crear un salto de línea
          const br = document.createElement('br');

          // Agregar el checkbox y la etiqueta al contenedor
          skillsBox.appendChild(checkbox);
          skillsBox.appendChild(label);
          skillsBox.appendChild(br);

          // Valida que este marcado
          checkbox.checked = true;
     });
}

// Funcion para cargar la data del mentor al forms
const loadFormsDataMentor = () => {

     // Se rellenan los campos del forms
     namesInput.value = userData.names;
     lastnameInput.value = userData.lastname;
     careerInput.value = userData.speciality;
     bioInput.value = userData.description;
     linkInput.value = userData.photo;

     // Se generan las habilidades en el forms
     userData.skills.forEach((skill) => {

          // Crear el elemento de checkbox
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = skill.toLowerCase().replace(/\s/g, '_');
          checkbox.name = 'skills';
          checkbox.value = capitalizeInitials(skill.toLowerCase().replace(/\s/g, ' '));

          // Crear la etiqueta del checkbox
          const label = document.createElement('label');
          label.htmlFor = skill.toLowerCase().replace(/\s/g, '_');
          label.textContent = capitalizeInitials(skill);

          // Crear un salto de línea
          const br = document.createElement('br');

          // Agregar el checkbox y la etiqueta al contenedor
          skillsBox.appendChild(checkbox);
          skillsBox.appendChild(label);
          skillsBox.appendChild(br);

          // Valida que este marcado
          checkbox.checked = true;
     });

     // Cargar CV

     const divCv = document.createElement('div');
     divCv.className = "form-group";

     // Crear la etiqueta del checkbox
     const label = document.createElement('label');
     label.htmlFor = 'cvDocument';
     label.textContent = "Ingrese su CV";

     const buttonCV = document.createElement('button');
     buttonCV.textContent = "Ingresar CV";
     buttonCV.id = "submit-cv";
     buttonCV.type = "button";
     divCv.appendChild(buttonCV);
     sectionInfo.appendChild(divCv);

     buttonCV.addEventListener('click', sendCV);
}

//Funcion para redirigir a la pagina ingreso de CV
const sendCV = () => {
     let url = "ingresoCV.html" + "?user=" + encodeURIComponent(user)
          + "&rol=" + encodeURIComponent(type);
     window.location.href = url;
}

// Funcion para enviar data al servidor JSON
const sendChangesData = () => {
     // Obtener el ID del usuario que deseas editar
     const userId = userData.id;

     // Obtener los valores actualizados del usuario desde los campos del formulario
     const user = userData.user;
     const names = namesInput.value;
     const lastname = lastnameInput.value;
     const password = userData.password;
     const email = userData.email;
     const career = careerInput.value;
     const description = bioInput.value;
     const linkPhoto = linkInput.value;
     const checkboxes = skillsBox.querySelectorAll('input[type="checkbox"]:checked');
     const selectedSkills = [];

     if (names === '' || lastname === '' || career === ''
          || description === '' || linkPhoto === '')
          return

     checkboxes.forEach((checkbox) => {
          selectedSkills.push(checkbox.value);
     });

     // Crear un objeto con los datos actualizados del usuario
     let updatedUser = {
          id: userId,
          user: user,
          names: names,
          lastname: lastname,
          password: password,
          email: email,
          career: career,
          description: description,
          photo: linkPhoto,
          skills: selectedSkills,
     };

     if (type == 'mentors') {

          const icons = userData.icons;
          const reseñas = userData.Reseñas;
          const price = userData.price;
          const modalities = userData.modalities;

          updatedUser = {
               id: userId,
               user: user,
               names: names,
               lastname: lastname,
               password: password,
               email: email,
               speciality: career,
               photo: linkPhoto,
               icons: icons,
               skills: selectedSkills,
               description: description,
               Reseñas: reseñas,
               price: price,
               modalities: modalities,
          };
     }

     // Realizar una solicitud HTTP para actualizar el usuario en el JSON del servidor
     fetch(`http://localhost:3000/${type}/${userId}`, {
          method: 'PUT', // O PATCH dependiendo de tu implementación
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser)
     })
          .then(response => response.json())
          .then(data => {
               console.log('Usuario actualizado:', data);
               let url = "profile.html" + "?user=" + encodeURIComponent(user)
                    + "&rol=" + encodeURIComponent(type);
               window.location.href = url;
          })
          .catch(error => {
               alert('Error al actualizar el usuario:', error);
          });
}

// ------------------> Funciones para añadir events listeners


// Agregar evento de escucha para verificar el valor del campo de entrada
insertSkillInput.addEventListener('input', function () {
     // Verificar si el campo de entrada está vacío
     if (insertSkillInput.value.trim() === '') {
          insertButton.disabled = true; // Deshabilitar el botón
          insertButton.classList.remove('show');
     } else {
          insertButton.disabled = false; // Habilitar el botón
          insertButton.classList.add('show');
     }
});

// Agregar evento de escucha para crear la habilidad
insertButton.addEventListener('click', (e) => {

     // Obtener el valor del campo de entrada
     let skill = insertSkillInput.value.trim();
     // Verificar si el campo de entrada está vacío
     if (skill === '') {
          alert("Ingrese la habilidad que quiera añadir ")
          return;
     }
     // Crear el elemento de checkbox
     const checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.id = skill.toLowerCase().replace(/\s/g, '_');
     checkbox.name = 'skills';
     checkbox.value = capitalizeInitials(skill.toLowerCase().replace(/\s/g, ' '));

     // Crear la etiqueta del checkbox
     const label = document.createElement('label');
     label.htmlFor = skill.toLowerCase().replace(/\s/g, '_');
     label.textContent = capitalizeInitials(skill);

     // Crear un salto de línea
     const br = document.createElement('br');

     // Agregar el checkbox y la etiqueta al contenedor
     skillsBox.appendChild(checkbox);
     skillsBox.appendChild(label);
     skillsBox.appendChild(br);

     // Limpiar el campo de entrada
     insertSkillInput.value = '';

     // Deshabilitar el botón
     insertButton.disabled = true;
     insertButton.classList.remove('show');
});

// Se agrega los eventos a los botones

// Funcion de enviar data de actualizar
submitButton.addEventListener('click', sendChangesData);

// ------------ Ejecucion
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

// Agregar eventos de escucha
getUsers();