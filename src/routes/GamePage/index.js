import { useHistory } from "react-router";

const GamePage = () => {
  const history = useHistory();
  const handleClickButton = () => {
    history.push('/');
  }
  return (
    <>
      <div>
        <p>This is game page!!!</p>
        <button
          onClick={handleClickButton}>
          Start Game
        </button>
      </div>
    </>
  );
};

export default GamePage;
