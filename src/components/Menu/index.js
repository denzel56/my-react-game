import cn from 'classnames';
import { Link } from 'react-router-dom';
import s from './style.module.css';

const MENU_ITEMS = [
  {
    title: 'HOME',
    to: '/'
  },
  {
    title: 'GAME',
    to: 'game'
  },
  {
    title: 'ABOUT',
    to: 'about'
  },
  {
    title: 'CONTACT',
    to: 'contact'
  },

]

const Menu = ({ isOpen, onClickMenu }) => {

  return (
    <div className={cn(s.menuContainer, {
      [s.active]: isOpen === true,
      [s.deactive]: isOpen === false
    })}>
    <div className={cn(s.overlay)} />
      <div className={cn(s.menuItems)}>
        <ul>
          {
            MENU_ITEMS.map(({ title, to }, index) => (
              <li key = {index} onClick = {onClickMenu} >
                <Link to = {to}>
                  {title}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
  </div>
  )
}

export default Menu;
