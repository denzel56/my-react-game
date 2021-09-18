import { useHistory } from "react-router";

const ContactPage = () => {
  const history = useHistory();
  const handleClickButton = () => {
    history.push('/');
  }
  return (
    <>
      <div>
        <p>This is contact page!!!</p>
        <button
          onClick={handleClickButton}>
          Back to HomePage
        </button>
      </div>
    </>
  );
};

export default ContactPage;
