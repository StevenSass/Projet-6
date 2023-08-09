// recupère les inputs
const loginEmail = document.getElementById("email")
console.log(loginEmail)
const loginPassword = document.getElementById("password")
console.log(loginPassword)
const loginSubmit = document.getElementById("login")
console.log(loginSubmit);

// requete api (async)
async function login(url, data) {
    const apiEnvoi = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    //const avec les donnée recu de l'api traiter en .json
    const apiRecu = await apiEnvoi.json()

    //permet si l'obtention du token de le stocker en local
    if (apiRecu.hasOwnProperty("token")) {
        localStorage.setItem("token", apiRecu.token)
        location.href = "./index.html"
        console.log("reussi");
        
    }
    //sinon crée une alert = les informations sont incorrect
    else {
        alert("Information Incorrect")
        console.log("echouer");
    }
}

//permet de lire le button envoi pour lancer la fonction de l'api
loginSubmit.addEventListener("click", function() {
    //recolte les information transmise pour l'api
    const infoUser = {
        "email": loginEmail.value,
        "password": loginPassword.value
    }
    //lance la fonction de l'api avec l'url ainsi que les infos utilisateur
    login("http://localhost:5678/api/users/login", infoUser)
})

