// Variables globales de los objetos 

const skillsBox = document.getElementById("skill-list");
const boxes = skillsBox.querySelectorAll('input[type="checkbox"]');
const insertSkillInput = document.getElementById("insert-skills");
const insertButton = document.querySelector('.form-group button');
const infoDiv = document.getElementById('infoDiv');
const submitButton = document.getElementById('submit-info');

// Variables globales para el forms
const namesInput = document.getElementById('names');
const lastnameInput = document.getElementById('lastname');
const careerInput = document.getElementById('career');
const bioInput = document.getElementById('bio');

// Variable para obtener el usuario
let usersData = []
let userData = []

// ------------- Funciones 

// Funcion para los nombres formato

function capitalizeInitials(str) {
     return str.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
          return char.toUpperCase();
     });
}

// Funcion para obtener los usuarios de una API
const getUsers = () => {
     fetch('http://localhost:3000/users')
          .then((response) => response.json())
          .then((data) => {
               usersData = data;
               userData = usersData.find((data) => data.user === user);
               console.log("Usuario: ", userData);
               loadDataUser();
               loadFormsData();
          })
          .catch((error) => alert(error));
};

const loadDataUser = () => {

     // Creacion de los componentes

     const names = document.createElement('h2');
     names.innerText = userData.names + " " + userData.lastname;

     const rol = document.createElement('p');
     rol.innerText = userData.rol;

     const career = document.createElement('h3');
     career.innerText = userData.career;

     const bio = document.createElement('p');
     bio.innerText = userData.bio

     const skillTitle = document.createElement('h3');
     skillTitle.innerText = 'Habilidades'

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

     infoDiv.appendChild(names);
     infoDiv.appendChild(rol);
     infoDiv.appendChild(career);
     infoDiv.appendChild(bio);
     infoDiv.appendChild(skillTitle)
     infoDiv.appendChild(skillsList);

};

const loadFormsData = () => {
     namesInput.value = userData.names;
     lastnameInput.value = userData.lastname;
     careerInput.value = userData.career;
     bioInput.value = userData.bio;

     userData.skills.forEach((skill) => {
          boxes.forEach((checkbox) => {

               if (checkbox.value === skill) {
                    checkbox.checked = true;
               }
          });
     });

}


const sendChangesData = () => {
     // Obtener el ID del usuario que deseas editar
     const userId = userData.id;

     // Obtener los valores actualizados del usuario desde los campos del formulario
     const user = userData.user;
     const names = namesInput.value;
     const lastname = lastnameInput.value;
     const password = userData.password;
     const email = userData.email;
     const rol = userData.rol;
     const career = careerInput.value;
     const bio = bioInput.value;
     const checkboxes = skillsBox.querySelectorAll('input[type="checkbox"]:checked');
     const selectedSkills = [];

     checkboxes.forEach((checkbox) => {
          selectedSkills.push(checkbox.value);
     });
     console.log(names)
     // Crear un objeto con los datos actualizados del usuario
     const updatedUser = {
          user: user,
          names: names,
          lastname: lastname,
          password: password,
          email: email,
          rol: rol,
          career: career,
          bio: bio,
          skills: selectedSkills,
          id: userId,
     };

     // Realizar una solicitud HTTP para actualizar el usuario en el JSON del servidor
     fetch(`http://localhost:3000/users/${userId}`, {
          method: 'PUT', // O PATCH dependiendo de tu implementación
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser)
     })
          .then(response => response.json())
          .then(data => {
               console.log('Usuario actualizado:', data);
               let url = "profile.html" + "?user=" + encodeURIComponent(user);
               window.location.href = url;
          })
          .catch(error => {
               console.error('Error al actualizar el usuario:', error);
          });
}

// Funciones para añadir events listeners

// Obtener referencia al elemento de entrada y al botón


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

submitButton.addEventListener('click', sendChangesData);

// ------------ Ejecucion
// Leer los valores de usuario de la URL
let urlParams = new URLSearchParams(window.location.search);
let user = urlParams.get("user");
console.log("Usuario: " + user);

// Agregar eventos de escucha

getUsers();