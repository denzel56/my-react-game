const GamePage = ({ onChangePage }) => {
  const handleClickButton = () => {
    onChangePage && onChangePage('app');
  }
  return (
    <div>
      <p>This is game page!!!</p>
      <button onClick={handleClickButton}>
          Start Game
      </button>
    </div>
  );
};

export default GamePage;
