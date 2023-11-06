/**
 * Mon API est créée sur GitHub Pages pour récupérer les datas
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