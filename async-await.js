//In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
//  Questa funzione accetta un id di una ricetta e deve:

const dayjs = require("dayjs");
const linkRicetta = "https://dummyjson.com/recipes/"
const linkUsers = "https://dummyjson.com/userss/"


// funzione per recuperare la data con doppia chiama 
async function getChefBirthday(id) {
  let ricetta;

  try {
    const resRicetta = await fetch(`${linkRicetta}${id}`);
    ricetta = await resRicetta.json();

  } catch (error) {
    throw new Error(`Impossibile recuperare la ricetta richiesta`);
  }

  if (ricetta.message) {
    throw new Error("Id non esiste");

  }
  // try and catch seconda richiesta 
  let user;
  try {
    const resUser = await fetch(`${linkUsers}${ricetta.userId}`);
    user = await resUser.json();
  } catch (error) {
    throw new Error(`Richiesta non andata a buon fine nel recupero user`)
  }
  return user.birthDate;
}

// uso funzione e gestione errore con async
(async () => {
  try {
    const birthday = await getChefBirthday(1)
    const formatted = dayjs(birthday).format("DD/MM/YYYY");
    console.log("Data di nascita dello chef:", formatted);

  } catch (error) {
    console.error("Errore:", error.message)
  }

})()