import { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const loginUser = async ({ email, password, type }) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    })
  }

  switch (type) {
    case 'login':
      return (await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAV4byPzlGzsM0ufr2_WLrkkJSEZI2DrxU', requestOptions).then(res => res.json()));
    case 'signup':
      return (await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAV4byPzlGzsM0ufr2_WLrkkJSEZI2DrxU', requestOptions).then(res => res.json()));
    default:
      return 'I cannot login user'
    }
}

const MenuHeader = ({bgActive}) => {
  const [isOpen, setOpen] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);


  const handleClickHamburger = () => {
    setOpen(prevState => !prevState);
  }

  const handleClickLogin = () => {
    setOpenModal(prevState => !prevState);
  }

  const handleSubmitLoginForm = async (props) => {

    const response = await loginUser(props);

    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'oops');
    } else {
      localStorage.setItem('idToken', response.idToken);
      NotificationManager.success('Success!');
      setOpenModal(false);
    }
  }

  return (
    <>
      <Navbar
        onClickHamburger = {handleClickHamburger}
        isOpen = {isOpen}
        bgActive={bgActive}
        onClickLogin={handleClickLogin}
      />
      <Menu
        isOpen = {isOpen}
        onClickMenu = {handleClickHamburger}
      />
      <Modal
        isOpen={isOpenModal}
        onCloseModal={handleClickLogin}
        title={'Auth'}
      >
        <LoginForm
          onSubmit={handleSubmitLoginForm}
          isOpenModal={isOpenModal}
        />
      </Modal>
    </>
)
}

export default MenuHeader;
