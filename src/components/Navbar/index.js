import cn from 'classnames';
import s from './style.module.css';

const Navbar = ({ isOpen, bgActive = false, onClickHamburger }) => {

  return (
    <nav id = {s.navbar} className = {cn(s.root, {
      [s.bgActive]: bgActive
    })}>
      <div className = {cn(s.navWrapper)}>
        <p className = {cn(s.brand)}>
          LOGO
        </p>
        <div className = {cn(s.menuButton, {
          [s.active]: isOpen
        })}
          onClick = {onClickHamburger}
        >
          <span />
        </div>
      </div>
    </nav>

  )
};

export default Navbar;
