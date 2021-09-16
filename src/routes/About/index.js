import { useHistory } from "react-router";

const AboutPage = () => {
  const history = useHistory();
  const handleClickButton = () => {
    history.push('/');
  }
  return (
    <>
      <div>
        <p>This is about page!!!</p>
        <button
          onClick={handleClickButton}>
          Back to HomePage
        </button>
      </div>
    </>
  );
};

export default AboutPage;
