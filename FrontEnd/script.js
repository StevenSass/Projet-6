// url des different chemin de l'api

const urlCategorie = "http://localhost:5678/api/categories"
const urlWorks = "http://localhost:5678/api/works"

// recuperer les donnée des Categorie dans l'api

function getCategory() {
    return fetch(urlCategorie).then((response) => response.json())
    .then((categories) => {
        return categories
    })
}

// afficher les categorie sur le site ( format bouton radio )

function displayCategories(categories) {
    let display = ``
    display += `<input type="radio" name="radio" class="filtre-radio" id="0" checked>`
    display += `<label for="0">Tous</label>`
        for (let compteur = 0; compteur < categories.length; compteur++){
                display += `<input type="radio" name="radio" class="filtre-radio" id="${categories[compteur].id}">`
                display += `<label for="${categories[compteur].id}">${categories[compteur].name}</label>`
        }
        document.querySelector(".filtre").innerHTML = display
}

// recuperer les donnée de Works dans l'api

function getWorks() {
    return fetch(urlWorks).then((response) => response.json())
    .then((works) => {
        return works
    })
}

// afficher works sur le site

async function displayWorks(works, id) {
    if (id == 0) {
        console.log("0")
        let affichages = ``
        for (let compteur = 0; compteur < works.length; compteur++){
                affichages += `<figure>`
                affichages += `<img src="${works[compteur].imageUrl}" alt="${works[compteur].title}">`
                affichages += `<figcaption>${works[compteur].title}</figcaption>`
                affichages += `</figure>`
        }
        document.querySelector(".gallery").innerHTML = affichages

    } else {
        console.log("1,2,3")
        let affichages = ``
        works.filter(dataFiltre => dataFiltre.categoryId == id)
        .forEach(categorieFiltre => {
            console.log(categorieFiltre)
            
            affichages += `<figure>`
            affichages += `<img src="${categorieFiltre.imageUrl}" alt="${categorieFiltre.title}">`
            affichages += `<figcaption>${categorieFiltre.title}</figcaption>`
            affichages += `</figure>`

            document.querySelector(".gallery").innerHTML = affichages
        })
    }
}

// lire les different bouton filtre

async function getFilterId() {

    let filtreSelector = document.querySelectorAll(".filtre input")

        filtreSelector.forEach(btn => {
        btn.addEventListener("click", async function(){
            const works = await getWorks()
            let id = btn.id
            console.log(id)
            displayWorks(works, id)
        })
    })
}

function defaut(works) {
    let affichages = ``
        for (let compteur = 0; compteur < works.length; compteur++){
                affichages += `<figure>`
                affichages += `<img src="${works[compteur].imageUrl}" alt="${works[compteur].title}">`
                affichages += `<figcaption>${works[compteur].title}</figcaption>`
                affichages += `</figure>`
        }
        document.querySelector(".gallery").innerHTML = affichages
}

async function init() {
    const works = await getWorks()
    const categories = await getCategory()
    displayCategories(categories)
    getFilterId()
    defaut(works)
}

init()





// crée les bouton categorie automatiquement
// filtrer les projet par rapport au bon bouton

// recuperation des information pour le mode admin
const navbarEdition = document.querySelector(".navbar-edition")
const adminSection1 = document.querySelector(".admin-section-1")
const adminSection2 = document.querySelector(".admin-section-2")
const filtre = document.querySelector(".filtre")
const logoutLink = document.querySelector(".logout-link")
const loginLink = document.querySelector(".login-link")

// function pour ajputer le mode admin
function modeAdmin() {
    navbarEdition.classList.add("admin")
    adminSection1.classList.add("admin")
    adminSection2.classList.add("admin")
    filtre.classList.add("admin")
    logoutLink.classList.add("admin")
    loginLink.classList.add("admin")
}
// recuperration du token si il y es
const lookToken = localStorage.getItem("token")

// si le token es la alors lance la function mode admin
if(lookToken){
    modeAdmin()
}

// si la personne clique sur logout suprime le token
logoutLink.addEventListener("click", function(){
    localStorage.removeItem("token")
})


// ======================================================================================  //
//                                    Modale                                              //
// ===================================================================================== //


// lecture des class de la modale
const modalContainer = document.querySelector(".modal-container")
const modalTriggers = document.querySelectorAll(".modal-trigger")

// au click lance la fonction toggleModal pour l'ouvrir
// au click lance la function modalGetElement pour recuperer et afficher les element
modalTriggers.forEach(trigger => trigger.addEventListener("click", function () {
    toggleModal()
}))
modalGetElement()

// merme d'ouvrir la modale
function toggleModal(){
    modalContainer.classList.toggle("active")
}

// permet de lancer la fonction d'afichage et de recolter les projet
async function modalGetElement() {
    const works = await getWorks()
    modalAffichage(works)
    deleteButton()
}

// permet d'afficher les element 
function modalAffichage(works) {
    
    let affichages = ``
    for (let compteur = 0; compteur < works.length; compteur++){
            affichages += `<div class="element">`
            affichages += `     <img src="${works[compteur].imageUrl}" alt="${works[compteur].title}">`
            affichages += `     <svg class="delete-button" xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none" id="${works[compteur].id}">`
            affichages += `         <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>`
            affichages += `     </svg>`
            affichages += `     <button>éditer</button>`
            affichages += `</div>`
    }
    document.querySelector(".modal__galerie").innerHTML = affichages
}

// ======================================================================================  //
//                                    Modale ajout immage                                 //
// ===================================================================================== //

// lecture des class de la modale
const modalAjoutContainer = document.querySelector(".modal-ajout-container")
const modalAjoutTriggers = document.querySelectorAll(".modal-ajout-trigger")

// au click lance la fonction toggleModal pour l'ouvrir
// au click lance la function modalGetElement pour recuperer et afficher les element
modalAjoutTriggers.forEach(trigger => trigger.addEventListener("click", function () {
    toggleAjoutModal()
}))

// merme d'ouvrir la modale
function toggleAjoutModal(){
    modalAjoutContainer.classList.toggle("active")
}

// je recolte l'input ainsi que l'image que je vais previsualiser
const inputImage = document.querySelector(".input-image")
console.log(inputImage);
const modaleImage = document.querySelector(".modale-image")
console.log(modaleImage);

modaleImage.addEventListener("change", function() {
    modaleImage.src = URL.createObjectURL(inputImage.file[0])
})


// ======================================================================================  //
//                                    liaison entre modal                                 //
// ===================================================================================== //

const addPhoto = document.querySelector(".modal__btn__add")
addPhoto.addEventListener("click", function () {
    toggleAjoutModal()
    toggleModal()
})

const modalAjoutReturn = document.querySelector(".modal-ajout__return")
modalAjoutReturn.addEventListener("click", function () {
    toggleAjoutModal()
    toggleModal()
})


// ======================================================================================  //
//                                    suppression button                                  //
// ===================================================================================== //

function deleteButton() {
    const deleteButton = document.querySelectorAll(".delete-button")
    deleteButton.forEach(button => button.addEventListener("click", function(event) {
        event.preventDefault()
        fetch (`http://localhost:5678/api/works/${button.id}`, {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        mode:"cors",
        })
        return false
    }))
}

// permet de lire l'image
new FileReader

new Image()

new FormData()

new Blob()
