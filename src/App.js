import { useState } from "react";
import GamePage from "./routes/Game";
import HomePage from "./routes/Home";

const App = () => {
  const [page, setState] = useState('app');

  const handleChangePage = (page) => {
    console.log('####: <Main />');
    setState(page);
  }

  switch (page) {
    case "app":
      return <HomePage onChangePage = {handleChangePage}/>
    case "game":
      return <GamePage onChangePage = {handleChangePage}/>
    default:
      return <HomePage />
  }
}

export default App;
