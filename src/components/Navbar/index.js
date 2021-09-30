import cn from 'classnames';

import { ReactComponent as LoginSVG } from '../../assets/login.svg';
import s from './style.module.css';

const Navbar = ({ isOpen, bgActive = false, onClickHamburger, onClickLogin }) => {

  return (
    <nav id = {s.navbar} className = {cn(s.root, {
      [s.bgActive]: bgActive
    })}>
      <div className = {cn(s.navWrapper)}>
        <p className = {cn(s.brand)}>
          LOGO
        </p>
        <div className={s.loginAndMenu}>
          <div
            className={s.loginWrap}
            onClick={onClickLogin}
          >
            <LoginSVG />
          </div>
          <div className = {cn(s.menuButton, {
              [s.active]: isOpen
            })}
              onClick = {onClickHamburger}
            >
              <span />
          </div>
        </div>
      </div>
    </nav>

  )
};

export default Navbar;
