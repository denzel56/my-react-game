import { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';

const MenuHeader = () => {
  const [hamburger, setState] = useState(null);

  const handleClickHamburger = (hamburger) => {
    setState(prevState => !prevState);
  }

  return (
    <>
      <Navbar
        onClickHamburger={handleClickHamburger}
        state = {hamburger}
      />
      <Menu
        state = {hamburger}
      />
    </>
)
}

export default MenuHeader;
