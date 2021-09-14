import cn from 'classnames';
import s from './style.module.css';

const Navbar = ({ onClickHamburger, state }) => {
  const handleClick = () => {

    onClickHamburger && onClickHamburger();
  }

  return (
    <nav className={cn(s.root)}>
      <div className={cn(s.navWrapper)}>
        <p className={cn(s.brand)}>
          LOGO
        </p>
        <a href="#s" className={cn(s.menuButton, {[s.active]: state})} onClick = {handleClick} >
          <span />
        </a>
      </div>
    </nav>

  )
};

export default Navbar;
