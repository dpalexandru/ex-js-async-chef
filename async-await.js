//In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
//  Questa funzione accetta un id di una ricetta e deve:

const dayjs = require("dayjs");
const linkRicetta = "https://dummyjson.com/recipes/"
const linkUsers = "https://dummyjson.com/users/"


// funzione per recuperare la data con doppia chiama 
async function getChefBirthday(id) {
  let ricetta;

  try {
    const resRicetta = await fetch(`${linkRicetta}${id}`);
    ricetta = await resRicetta.json();

    if (ricetta.message) {
      throw new Error("Id non esiste");

    }
  } catch (error) {
    throw new Error(`Impossibile recuperare la ricetta richiesta con id ${id}`);
  }
  const resUser = await fetch(`${linkUsers}${ricetta.userId}`);
  const user = await resUser.json();

  return user.birthDate;
}

// uso funzione e gestione errore 
getChefBirthday(88888888)
  .then(birthday => {
    // Formatto la data 
    const formatted = dayjs(birthday).format("DD/MM/YYYY");
    console.log("Data di nascita dello chef:", formatted);
  }).catch(error => console.error("Errore:", error.message));