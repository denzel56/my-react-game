import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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
export const database = getDatabase();
