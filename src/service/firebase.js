import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAV4byPzlGzsM0ufr2_WLrkkJSEZI2DrxU",
  authDomain: "pokemon-game-react.firebaseapp.com",
  databaseURL: "https://pokemon-game-react-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-game-react",
  storageBucket: "pokemon-game-react.appspot.com",
  messagingSenderId: "772589792644",
  appId: "1:772589792644:web:5f8f9e786e122ec226c1d1"
};

export const firebaseApp = initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    this.database = getDatabase();
    this.dbRef = ref(this.database);
  }

  getPokemonSoket = (callback) => {
    onValue((ref(this.database, `pokemons`)), (snapshot) => {
      callback(snapshot.val())
    });
  }

  getPokemonsOnce = async () => {
    return await get(child(this.dbRef, `pokemons`)).then((snapshot) => snapshot.val());
  }

  postPokemon = (key, pokemon) => {
    set(ref(this.database, `pokemons/${key}`), pokemon);
  }

  addPokemon = (dataPoks, callback) => {
    const getRandomPokemon = (num) => Math.ceil(Math.random() * num);
    const newPokemonKey = push(child(this.dbRef, 'pokemons')).key;

    set(ref(this.database, `pokemons/${newPokemonKey}`),
      dataPoks[getRandomPokemon((dataPoks.length) - 1)]
    )
  }
}
export default Firebase;
