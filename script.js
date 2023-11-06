/**
 * Mon API est créée sur GitHub Pages pour récupérer les datas
 * https://github.com/elviredev/pets-adoption-data
 * API d'origine : https://learnwebcode.github.io/pet-adoption-data/pets.json
 * @type {Response}
 */
const petPromise = await fetch('https://elviredev.github.io/pets-adoption-data/pets.json')
const pets = await petPromise.json()

const template = document.querySelector('#animal-card')
const wrapper = document.createElement("div")

/*
    Texte différent si age < 1 an ou > 1 an
*/
function decideAgeText(age) {
    if (!age) {
        return "Moins d'un an"
    }
    return age > 1 ? `${age} ans` : "1 an"
}

/*
    Peupler index.html avec les datas
*/
pets.forEach(pet => {
    // Ajouter un clone du template
    const clone = template.content.cloneNode(true)
    // Insérer les données dynamiquement
    // name
    clone.querySelector("h3").textContent = pet.name

    // image
    const img = clone.querySelector("img")
    img.src = pet.photo
    img.alt = `Un ${pet.species} appelé ${pet.name}`

    // âge
    const age = new Date().getFullYear() - pet.birthYear
    const ageText = decideAgeText(age)
    clone.querySelector(".age").textContent = ageText

    // espèce
    clone.querySelector('.species').textContent = pet.species

    // description
    clone.querySelector('.description').textContent = pet.description

    // btn
    clone.querySelector('.name').textContent = pet.name
    // lien vers page détail d'un animal
    clone.querySelector('.btn-primary').href = `https://elviredev.github.io/pets-adoption-data/pets/${pet.id}/`

    wrapper.appendChild(clone)
})

document.querySelector('.animals').appendChild(wrapper)

/*
    Filtres
*/

const filterButtons = document.querySelectorAll('.filter-nav a')
filterButtons.forEach(el => {
    el.addEventListener("click", e => handleFilterClick(e))
})

function handleFilterClick(e) {
    let target = e.target

    if (e.target.classList.contains("only-large-screen")) {
        target = e.target.closest("a")
    }

    e.preventDefault()
    // Supprimer active class sur tous les liens
    filterButtons.forEach(el => {
        el.classList.remove("active")
    })
    // Ajouter active class sur le lien cliqué
    target.classList.add("active")

    // Fonction de filtrage selon l'espèce
    //En paramètre target.dataset.filter = all, dog, cat, rabbit
    filterPets(target.dataset.filter)
}

function filterPets(species) {
    const allPets = document.querySelectorAll('.animal-card')
    if (species == "all") {
        allPets.forEach(el => {
            el.style.display = ""
        })
    } else {
        allPets.forEach(el => {
            if (el.querySelector(".species").textContent == species) {
                el.style.display = ""
            } else {
                el.style.display = "none"
            }
        })
    }
}






















