import cn from 'classnames';
import s from './style.module.css';

const MENU_ITEMS = [
  {
    title: 'HOME',
    to: '#welcome'
  },
  {
    title: 'GAME',
    to: '#game'
  },
  {
    title: 'ABOUT',
    to: '#about'
  },
  {
    title: 'CONTACT',
    to: '#contact'
  },

]

const Menu = ({ isOpen }) => {

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
              <li key = {index}>
                <a href = {to}>
                  {title}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
  </div>
  )
}

export default Menu;
