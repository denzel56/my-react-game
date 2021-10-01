import { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import NotificationManager from 'react-notifications/lib/NotificationManager';

const MenuHeader = ({bgActive}) => {
  const [isOpen, setOpen] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isRegister, setRegister] = useState(false);


  const handleClickHamburger = () => {
    setOpen(prevState => !prevState);
  }

  const handleClickLogin = () => {
    setOpenModal(prevState => !prevState);
  }

  const handleClickRegisterLink = () => {
    setRegister(prevState => !prevState)
  }
  const handleSubmitLoginForm = async ({email, password}) => {

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      })
    }
    const responseLink = isRegister ?
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAV4byPzlGzsM0ufr2_WLrkkJSEZI2DrxU' :
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAV4byPzlGzsM0ufr2_WLrkkJSEZI2DrxU'

    const response = await fetch(responseLink, requestOptions).then(res => res.json());

    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'oops');
    } else {
      localStorage.setItem('idToken', response.idToken);
      isRegister ?
        NotificationManager.success('Register success!') :
        NotificationManager.success('Sign in ok!');
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
        title={isRegister ? 'Register' : 'Log in'}
        onCloseModal={handleClickLogin}
      >
        <LoginForm
          onSubmit={handleSubmitLoginForm}
          onRegister={handleClickRegisterLink}
          buttonTitle={isRegister ? 'Sing up' : 'Sign in'}
          linkTitle={isRegister ? 'Log in?' : 'Register?'}
          isOpenModal={isOpenModal}
        />
      </Modal>
    </>
)
}

export default MenuHeader;
