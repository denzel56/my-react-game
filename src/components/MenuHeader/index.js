import { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { useDispatch } from 'react-redux';
import { getUserUpdateAsync } from '../../store/user';

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
  const dispatch = useDispatch();
  // const state = useStore();
  // console.log('### state', state.getState());


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
      if (props.type === 'signup') {
        const pokemonStart = await fetch(' https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
        console.log('### start', pokemonStart);

        for (const item of pokemonStart.data) {
          await fetch(`https://pokemon-game-react-default-rtdb.europe-west1.firebasedatabase.app/${response.localId}/pokemons.json?auth=${response.idToken}`, {
            method: 'POST',
            body: JSON.stringify(item),
          })
        }
      }
      localStorage.setItem('idToken', response.idToken);
      NotificationManager.success('Success!');
      dispatch(getUserUpdateAsync());
      handleClickLogin();
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
