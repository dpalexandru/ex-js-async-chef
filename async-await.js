//In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
//  Questa funzione accetta un id di una ricetta e deve:

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
    console.log(ricetta);
    if (ricetta.message) {
      throw new Error("Id non esiste");

    }
  } catch (error) {
    console.error("Errore nel recupero della ricetta:", error.message);
    throw new Error("Impossibile recuperare la ricetta richiesta");
    return null;
  }

  const user = await fetchJson(`${linkUsers}${ricetta.userId}`)
  console.log(user.birthDate)
  const birthDate = user.birthDate
  return birthDate

}

// uso funzione e gestione errore 
getChefBirthday(111111111)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));