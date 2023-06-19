const selectMentor = document.getElementById("mentor_list");
const inputReview = document.getElementById("send-review");

let mentores = [];
let objectMentor;
let objectReview;

const getMentors=()=>{
    fetch("http://localhost:3000/mentors")
    .then(response=>response.json())
    .then(data=>{
        mentores=data;
        addMentor();
    })
    .catch(err=>console.error("Error",error));
}

const addMentor=()=>{
    for(var i = 0; i < mentores.length; ++i){
        var option = document.createElement("option");
        option.textContent =mentores[i].names + " " +mentores[i].lastname;
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

function getObjectMentor(){
    for(var i = 0; i < mentores.length; i++){
        if(selectMentor.value === (mentores[i].names + " " +mentores[i].lastname) )return mentores[i];
    }
}

inputReview.addEventListener("click", function(event){
    var getPerson = document.getElementsByClassName("input-subject");
    var name = capitalizeInitials(getPerson[0].value);
    var lastname = capitalizeInitials(getPerson[1].value);
    var commit = document.getElementById("Textarea").value;
    objectMentor = getObjectMentor();
    objectReview = {
        name: name,
        lastname : lastname,
        review : commit
    };
    console.log(objectReview);
    console.log(objectMentor);
    objectMentor.Reseñas.push(objectReview);
    fetch("http://localhost:3000/mentors/"+objectMentor.id,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objectMentor)
    })
     .then(response=>response.json())
     .then(data=>{
        console.log("Reseña registra: ", data);
        window.location.href = 'busqueda.html';
    })
     .catch(err=>console.error("Error",error));
});



getMentors();