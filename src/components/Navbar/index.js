import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as LoginSVG } from '../../assets/login.svg';
import { ReactComponent as UserSVG } from '../../assets/user.svg';
import { selectorUserLoading, selectUserLocalId } from '../../store/user';
import s from './style.module.css';

const Navbar = ({ isOpen, bgActive = false, onClickHamburger, onClickLogin }) => {
  const isLoadingUser = useSelector(selectorUserLoading);
  const userLocalId = useSelector(selectUserLocalId);

  return (
    <nav id = {s.navbar} className = {cn(s.root, {
      [s.bgActive]: bgActive
    })}>
      <div className = {cn(s.navWrapper)}>
        <p className = {cn(s.brand)}>
          LOGO
        </p>
        <div className={s.loginAndMenu}>
          {(!isLoadingUser && !userLocalId) && (
            <div
            className={s.loginWrap}
            onClick={onClickLogin}
          >
            <LoginSVG />
          </div>
          )}
          {(!isLoadingUser && userLocalId) && (
            <Link
            className={s.loginWrap}
            to="/user"
            >
            <UserSVG />
            </Link>
          )}

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
