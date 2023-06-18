// Variables globales de los objetos 
let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
    'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

let prevYeatDOM = document.getElementById('prev-month-year');
let nextYearDOM = document.getElementById('next-month-year');

// Variables para el link a cada pagina
const busquedaLink = document.getElementById('busqueda-link');
const sesionLink = document.getElementById('sesion-link');
const profileLink = document.getElementById('profile-link');

// Variables globales para el calendario
month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', () => lastMonth());
nextMonthDOM.addEventListener('click', () => nextMonth());

prevYeatDOM.addEventListener('click', () => lastYear());
nextYearDOM.addEventListener('click', () => nextYear());

const writeMonth = (month) => {

    for (let i = startDay(); i > 0; i--) {
        dates.innerHTML += ` <div class="calendar__date calendar__item calendar__last-days">
            ${getTotalDays(monthNumber - 1) - (i - 1)}
        </div>`;
    }

    for (let i = 1; i <= getTotalDays(month); i++) {
        if (i === currentDay) {
            dates.innerHTML += ` <div class="calendar__date calendar__item calendar__today">${i}</div>`;
        } else {
            dates.innerHTML += ` <div class="calendar__date calendar__item">${i}</div>`;
        }
    }
}

const getTotalDays = month => {
    if (month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return 31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return isLeap() ? 29 : 28;
    }
}

const isLeap = () => {
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}

const startDay = () => {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

const lastMonth = () => {
    if (monthNumber !== 0) {
        monthNumber--;
    } else {
        monthNumber = 11;
        currentYear--;
    }
    setNewDate();
}

const nextMonth = () => {
    if (monthNumber !== 11) {
        monthNumber++;
    } else {
        monthNumber = 0;
        currentYear++;
    }
    setNewDate();
}

const setNewDate = () => {
    currentDate.setFullYear(currentYear, monthNumber, currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(monthNumber);
}

const lastYear = () => {
    currentYear--;
    setNewDate();
}

const nextYear = () => {
    currentYear++;
    setNewDate();
}

let isResize = false;

window.addEventListener('resize', function () {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const calendarWeek = document.querySelector('.calendar__week'); // Obtener el div con la clase "calendar__week"
    const calendarDays = calendarWeek.querySelectorAll('.calendar__day'); // Obtener todos los elementos hijos con la clase "calendar__day"


    // Usando el método forEach (convertir los elementos en un array primero)

    const daysWeekTransform = {
        'Lunes': 'L',
        'Martes': 'M',
        'Miércoles': 'M',
        'Jueves': 'J',
        'Viernes': 'V',
        'Sábado': 'S',
        'Domingo': 'D'
    }
    const daysWeek = {
        'L': 'Lunes',
        'M': 'Martes',
        'M': 'Miércoles',
        'J': 'Jueves',
        'V': 'Viernes',
        'S': 'Sábado',
        'D': 'Domingo'
    }

    console.log(isResize);
    if (screenWidth < 800 && isResize === false) {
        isResize = true;
        console.log(isResize);
        console.log("text 2");
        Array.from(calendarDays).forEach((day) => {
            console.log(`{${day.innerHTML.toString()}}`);
            day.innerHTML = daysWeekTransform[day.innerHTML.toString()];
            console.log(`{${day.innerHTML.toString()}}`);
        });
    }
    if (screenWidth > 1000 && isResize === true) {
        console.log("2 text");
        Array.from(calendarDays).forEach((day) => {
            day.innerHTML = daysWeek[day.innerHTML.toString()];
            console.log(`{${day.innerHTML.toString()}}`);
        });
        isResize = false;
    }

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

// Funcion de enviar data a la pagina perfil
profileLink.href = "profile.html" + "?user=" + encodeURIComponent(user)
    + "&rol=" + encodeURIComponent(type);
writeMonth(monthNumber);