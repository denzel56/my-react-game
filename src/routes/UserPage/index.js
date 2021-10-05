import { useStore } from "react-redux";
import { useHistory } from "react-router";

import s from './style.module.css';

const UserPage = () => {
  const reduxStore = useStore();
  const store = reduxStore.getState();
  const history = useHistory();
  const handleClickButton = () => {
    history.push('/');
  }

  const dateVisit = store.user.data.lastLoginAt;
  const dateCreate = store.user.data.createdAt;
  const date = new Date(parseInt(dateCreate));
  const dateV = new Date(parseInt(dateVisit));

  return (
    <>
      <div>
        <div className={s.userWrap} >
            <p>Email: {store.user.data.email}</p>
            <p>Дата последнего взита: {dateV.toLocaleString()}</p>
          <p>Дата регистрации: {date.toLocaleString()}</p>
        </div>
        <div className={s.flex}>
          <button
            onClick={handleClickButton}>
            Back to HomePage
          </button>
          <button
            onClick={() => {
              history.push('/');
              localStorage.removeItem('idToken');
              window.location.reload();
            }}>
            Log out
          </button>
        </div>

      </div>
    </>
  );
};

export default UserPage;
