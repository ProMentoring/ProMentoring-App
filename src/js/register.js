// Obtener los objetos del DOM
const form = document.getElementById('form-register');
const emailInput = document.getElementById('email');
const userInput = document.getElementById('user');
const namesInput = document.getElementById('names');
const lastnameInput = document.getElementById('lastname');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const rolSelect = document.getElementById('rol');

// Variable para obtener los usuarios existentes
let students = []
let mentors = []
let users = [];

// Funcion para obtener los usuarios de una API
const getUsers = () => {
     fetch('http://localhost:3000/students')
          .then((response) => response.json())
          .then((data) => {
               students = data;
               users = students;
          })
          .catch((error) => alert(error));
     fetch('http://localhost:3000/mentors')
          .then((response) => response.json())
          .then((data) => {
               mentors = data;
               mentors.forEach((mentor) => users.push(mentor));
          })
          .catch((error) => alert(error));
}

// Función de validación de las contraseñas
function validatePassword() {
     // Obtener los valores de los campos del formulario
     let password = passwordInput.value;
     let passwordConfirm = passwordConfirmInput.value;
     let passwordError = document.getElementById('errorPassword');

     if (password !== passwordConfirm) {
          passwordError.textContent = 'Las contraseñas no coinciden';
          passwordInput.classList.add('error');
          passwordConfirmInput.classList.add('error');
          passwordError.classList.add('show');
     } else {
          passwordError.textContent = '';
          passwordInput.classList.remove('error');
          passwordConfirmInput.classList.remove('error');
          passwordError.classList.remove('show');
     }
}

// Funcion para los nombres formato

function capitalizeInitials(str) {
     return str.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
          return char.toUpperCase();
     });
}

// Agregar un event listener para el evento "submit" del formulario
form.addEventListener('submit', (event) => {
     event.preventDefault(); // Evitar el envío del formulario por defecto
     let email = emailInput.value;
     let user = userInput.value;
     let names = namesInput.value;
     let lastname = lastnameInput.value;
     let password = passwordInput.value;
     let passwordConfirm = passwordConfirmInput.value;
     let rol = rolSelect.value;
     // Validar el campo de selección (rol)
     if (rol === '') {
          alert('Por favor, selecciona un rol académico');
          return;
     }
     // Validar el campo de contraseña (rol)
     if (password !== passwordConfirm) {
          console.log(password)
          console.log(passwordConfirm)
          alert("Por favor, ingrese correctamente las contraseñas");
          return;
     }
     // Validar el campo de usuario (rol)

     if (users.find(u => u.user === user || user.email === email)) {
          alert(`El usuario ya esta registrado con el mismo usuario: ${user} y email: ${email}`);
          return;
     } else {

          // Se da formato a la data

          names = capitalizeInitials(names);
          lastname = capitalizeInitials(lastname);

          // Crear un objeto con los datos del nuevo usuario

          let newUser = {
               user: user,
               names: names,
               lastname: lastname,
               password: password,
               email: email,
               rol: rol,
               career: '',
               description: '',
               skills: [],
          };
          if (rol === 'mentors') {
               newUser = {
                    user: user,
                    names: names,
                    lastname: lastname,
                    password: password,
                    email: email,
                    speciality: '',
                    photo: '',
                    icons: [],
                    skills: [],
                    description: '',
                    Reseñas: [],
                    price: '',
                    modalities: ''
               };
          }

          // Llamada a la API mediante fetch y enviar el objeto
          fetch(`http://localhost:3000/${rol}`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(newUser)
          })
               .then(response => response.json())
               .then(data => {
                    console.log('Usuario agregado:', data);
                    window.location.href = 'profile.html' + "?user=" + encodeURIComponent(user) + "&rol=" + encodeURIComponent(rol);
               })
               .catch(error => {
                    console.error('Error al agregar el usuario:', error);
               });
     }
});


// Agregar eventos de escucha 

// Obtener los usuarios desde el JSON
getUsers();
// Para la validacion de contraseña y confirmación de contraseña
passwordInput.addEventListener('input', validatePassword);
passwordConfirmInput.addEventListener('input', validatePassword);