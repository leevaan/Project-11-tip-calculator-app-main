"use strict"
const billClass = document.querySelector("#usdd");
const customClass = document.querySelector(".custom");
const personClass = document.querySelector("#personn");

const amount = document.querySelector(".amount-value");
const totalPerson = document.querySelectorAll(".amount-value")[1];

const billBorder = document.querySelectorAll(".input-div")[0];
const personBorder = document.querySelectorAll(".input-div")[1];

const button = document.getElementsByTagName("button")[0];
const tipClass = document.querySelectorAll(".tip");

let tip, total, billValue, personValue, customValue, numClass;
let tipAction = "inactive";

// bill border style.
billClass.addEventListener("focus", () => {
    billBorder.style.border = "2px solid #26C2AE";
    document.querySelector(".usd-path").style.fill = "#00474B";
});
billClass.addEventListener("blur", () => {
    billBorder.style.borderColor = "transparent";
    document.querySelector(".usd-path").style.fill = "#9EBBBD";
});

// custom border style.
customClass.addEventListener("focus", () => {
    customClass.style.border = "2px solid #26C2AE";
});
customClass.addEventListener("blur", () => {
    customClass.style.borderColor = "transparent";
});

//person border style
personClass.addEventListener("focus", () => {
    if(personClass.value != 0 || personClass.value == ""){
        personBorder.style.border = "2px solid #26C2AE";
        document.querySelector(".person-path").style.fill = "#00474B";
    }
});
personClass.addEventListener("blur", () => {
    // personClass.value = undefined;
    if(personClass.value != 0 || personClass.value == ""){
        personBorder.style.borderColor = "transparent";
        document.querySelector(".person-path").style.fill = "#9EBBBD";
    }
});

//ვიმახსოვრებთ ველიუში ჩაწერილ ციფრს და სამი ველიუდან ( Bill, precent, person) თუ ბოლოს შევსო bill ველიუ ეს გაუშვებს დავთვლის ფუნქციას 
billClass.addEventListener("input", () =>{
    billClass.style.background = "transparent";
    button.style.backgroundColor = "#26C2AE";
    billValue = billClass.value;

    if(personClass.value == ""  && billClass.value == "" && customClass.value == "" && tipAction == "inactive"){
        button.style.backgroundColor = "";
    }
    if(personValue > 0 && billValue > 0 && numClass != undefined){
        condition(billValue, numClass, personValue);
    }
});

// როდესაც ფიქსირებულ პროცენტს ირჩევს.
document.querySelector(".left-middle-cont").addEventListener("click", event => {
    numClass = event.target.getAttribute("num");
    let eventTarget = event.target;
   
    if(eventTarget.classList[1] == undefined && eventTarget.classList[0] == "tip")
    {    
        tipAction = "active";
        for(let i = 0; i < tipClass.length; i++){
            tipClass[i].classList.remove("show");
        }
        customClass.value = "";
        eventTarget.classList.add("show");
        button.style.backgroundColor = "#26C2AE";
      }else if(eventTarget.classList[1] == "show"){   
        tipAction = "inactive";
        eventTarget.classList.remove("show");
        if(personClass.value == ""  && billClass.value == "" && customClass.value == ""  && tipAction == "inactive"){
            button.style.backgroundColor = "";
        }
        numClass = null;
        amount.innerHTML = "$0.00";
        totalPerson.innerHTML = "$0.00";
    }
    if(personValue > 0 && billValue > 0 && numClass != null){
        condition(billValue, numClass, personValue);
    }
});

//ვიმახსოვრებთ ველიუში ჩაწერილ ციფრს და სამი ველიუდან ( Bill, precent, person) თუ ბოლოს შევსო person ველიუ ეს გაუშვებს დავთვლის ფუნქციას 
// კოსტუმ ველიუი. იმახსოვრებს შეყვანილს ციფრს.შეყვანილ ციფრს სტრინგად აქცევს ნომრად და თუ სასვსე დანარჩენი ორი ველი იძახებს გამოთვლის ფუნქციას.
customClass.addEventListener("input", () => {
    customValue = customClass.value;
    button.style.backgroundColor = "#26C2AE";
    for(let i = 0; i < tipClass.length; i++){
        tipClass[i].classList.remove("show");
        tipAction = "inactive";
    }
    if(customClass.value > 0 && personClass.value > 0 && billClass.value > 0 && customClass.value != ""){
          condition(billValue, customValue, personValue);
    }else if(customValue == ""){ //თუ მომხმარებელი ქასთმ ველიუში ჩაწერილ ციფრებს წაშლის უნდა განულდეს ტიპ და ტოტალ ველიუები
        totalPerson.innerHTML = "$0.00";
        amount.innerHTML = "$0.00";
    }else{
        numClass = customValue;
    }
    if(personClass.value == "" && billClass.value == "" && customClass.value == "" && tipAction == "inactive"){
        button.style.backgroundColor = "";
    }
});

personClass.addEventListener("input", () =>{
    personClass.style.background = "transparent";
    personValue = personClass.value;
    button.style.backgroundColor = "#26C2AE";

    if(personClass.value == 0){
        personBorder.style.border = "2px solid #E17052";
        document.querySelector(".person-alert").style.display = "inline";
        document.querySelector(".person-path").style.fill = "#E17052";
    } 
    if(personClass.value != 0 || personClass.value == ""){
        
        personBorder.style.border = "2px solid #26C2AE";
        document.querySelector(".person-alert").style.display = "none";
        document.querySelector(".person-path").style.fill = "#00474B";
    } 
    if(personClass.value == ""  && billClass.value == "" && customClass.value == "" && tipAction == "inactive"){
        button.style.backgroundColor = "";
    }

    if(personValue > 0 && billValue > 0 && numClass != undefined){
        condition(billValue, numClass, personValue);
    }
});

// კალკულატორის მათემატიკური პირობა.
const condition = (bill, custom, person) => {
        tip = (bill * custom / 100) / person;
        amount.innerHTML ="$" + tip.toFixed(2);

        total = (bill / person) + tip;
        totalPerson.innerHTML = "$" + total.toFixed(2);
}

//reset button
button.addEventListener("click", () => {
    amount.innerHTML = "$0.00";
    totalPerson.innerHTML = "$0.00";
    billValue= undefined;
    personValue = undefined;
    personClass.value = "";
    billClass.value = "";
    customClass.value = "";
    for(let i = 0; i < tipClass.length; i++){
        tipClass[i].classList.remove("show");
    }
    button.style.backgroundColor = "";
    personBorder.style.borderColor = "transparent";
    document.querySelector(".person-alert").style.display = "none";
    document.querySelector(".person-path").style.fill = "#9EBBBD";
});