import { useHistory } from 'react-router';
// import { plusAction, selectCount } from '../../store/counter';
// import { useDispatch, useSelector } from 'react-redux';
import s from './style.module.css'

const Header = ({ title, descr }) => {
  const history = useHistory();
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();
  // console.log('#### count', count);

  const handleClick = () => {
    history.push('/game');
    // dispatch(plusAction(1));
  }
  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.silhouette}></div>
      <div className={s.moon}></div>
        <div className={s.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={handleClick}>
          Start Game
        </button>
        </div>
    </header>
  )
}

export default Header;
