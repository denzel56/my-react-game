import { useRouteMatch, Switch, Route} from "react-router";
import { useState } from "react";

import StartPage from "./routes/StartPage";
import BoardPage from "./routes/BoardPage";
import FinishPage from "./routes/FinishPage";
import { PokemonContext } from "../../context/pokemonContext";

const GamePage = () => {
  const match = useRouteMatch();
  const [selectedPokemons, setSelectedPokemons] = useState({});

  const handleSelectPokemon = (key, pokemon) => {

    setSelectedPokemons(prevState => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];

        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon
      }
    })
  }

  return (
    <PokemonContext.Provider value={{
      pokemons: selectedPokemons,
      onSelected: handleSelectPokemon,
      clearContext: setSelectedPokemons
    }}>
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
