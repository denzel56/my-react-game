import { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';

const MenuHeader = () => {
  const [hamburger, setState] = useState(undefined);

  const handleClickHamburger = (hamburger) => {
    setState(prevState => !prevState);
  }

  switch (hamburger) {
    case false:
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
    case true:
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
    default:
      return <Navbar
      onClickHamburger={handleClickHamburger}
      state = {hamburger}
      />
  }
}

export default MenuHeader;
