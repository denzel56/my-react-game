import cn from 'classnames'
import s from './style.module.css';

const Menu = ({ state }) => {

  return (
    <div className={cn(s.menuContainer, {[s.active]: state}, {[s.deactive]: !state})}>
    <div className={cn(s.overlay)} />
      <div className={cn(s.menuItems)}>
        <ul>
          <li>
            <a href="#welcome">
              HOME
            </a>
          </li>
          <li>
            <a href="#game">
              GAME
            </a>
          </li>
          <li>
            <a href="#about">
              ABOUT
            </a>
          </li>
          <li>
            <a href="#contact">
              CONTACT
            </a>
          </li>
        </ul>
      </div>
  </div>
  )
}

export default Menu;
