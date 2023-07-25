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

function displayWorks(works, id) {
    if (id === 0) {
        let affichages = ``
        for (let compteur = 0; compteur < works.length; compteur++){
                affichages += `<figure>`
                affichages += `<img src="${works[compteur].imageUrl}" alt="${works[compteur].title}">`
                affichages += `<figcaption>${works[compteur].title}</figcaption>`
                affichages += `</figure>`
        }
        document.querySelector(".gallery").innerHTML = affichages
    } else {
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

function getFilterId() {

    let filtreSelector = document.querySelectorAll(".filtre input")

    filtreSelector.forEach(btn => {
        btn.addEventListener("click", function(){
            let id = btn.id
            console.log(id)
            
            return id
        })
    })
}

async function init() {
    const works = await getWorks()
    const id = getFilterId()
    const categories = await getCategory()
    displayCategories(categories)
    displayWorks(works, id)
    
}


init()




// crée les bouton categorie automatiquement
// filtrer les projet par rapport au bon bouton
