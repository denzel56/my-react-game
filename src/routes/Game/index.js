import MenuHeader from "../../components/MenuHeader";

const GamePage = ({ onChangePage }) => {
  const handleClickButton = () => {
    onChangePage && onChangePage('app');
  }
  return (
    <>
      <MenuHeader
        bgActive = {true}
      />
      <div>
        <p>This is game page!!!</p>
        <button style = {{marginTop: '75px'}}
          onClick={handleClickButton}>
          Start Game
        </button>
      </div>
    </>
  );
};

export default GamePage;
