const cardNumber = document.getElementById("input1");
const cardName = document.getElementById("input2");
const month = document.getElementById("month");
const year = document.getElementById("year");
const cvv = document.getElementById("cvv");
const send = document.getElementById("submit");
const msg = document.getElementById("msg-submit");

let cards=[];

const getCards=()=>{
    fetch("http://localhost:3000/cards")
    .then(response=>response.json())
    .then(data=>{
        cards=data;
        console.log(cards);
    })
    .catch(err=>console.error("Error",error));
}

send.addEventListener("click",()=>{
    const findCard = cards.find((c)=>c.number==cardNumber.value &&
        c.name == cardName.value && parseInt(month.value)==c.month
        && parseInt(year.value)==c.year && parseInt(cvv.value) == c.cvv);
    console.log(findCard);
    if(findCard){
        if(findCard.cash > 240){
            msg.textContent="Se realizó el pago exitosamente";
            msg.style.color="green";
        }else{
            msg.textContent="No cuenta con dinero en su cuenta";
            msg.style.color="red";
        }
    }else{
        msg.textContent="No se completó el pago, por favor verifique su información";
        msg.style.color="red";
    }
})

getCards();