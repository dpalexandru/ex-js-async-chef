//In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
//  Questa funzione accetta un id di una ricetta e deve:

const dayjs = require("dayjs");
const linkRicetta = "https://dummyjson.com/recipes/"
const linkUsers = "https://dummyjson.com/users/"


// dati in formato JSON da un URL
async function fetchJson(url) {
  const response = await fetch(url)
  const obj = await response.json()
  return obj;
}

// funzione per recuperare la data con doppia chiama 
async function getChefBirthday(id) {
  let ricetta;

  try {
    ricetta = await fetchJson(`${linkRicetta}${id}`);
    if (ricetta.message) {
      throw new Error("Id non esiste");

    }
  } catch (error) {
    throw new Error("Impossibile recuperare la ricetta richiesta");
  }

  const user = await fetchJson(`${linkUsers}${ricetta.userId}`)
  const birthDate = user.birthDate
  return birthDate

}

// uso funzione e gestione errore 
getChefBirthday(4)
  .then(birthday => {
    // Formatto la data 
    const formatted = dayjs(birthday).format("DD/MM/YYYY");
    console.log("Data di nascita dello chef:", formatted);
  }).catch(error => console.error("Errore:", error.message));