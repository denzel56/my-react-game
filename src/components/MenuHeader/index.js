import { useState } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';

const MenuHeader = ({bgActive}) => {
  const [isOpen, setOpen] = useState(null);
  const [isOpenModal, setOpenModal] = useState(null);

  const handleClickHamburger = () => {
    setOpen(prevState => !prevState);
  }

  const handleClickLogin = () => {
    setOpenModal(prevState => !prevState);
  }

  return (
    <>
      <Navbar
        onClickHamburger = {handleClickHamburger}
        isOpen = {isOpen}
        bgActive={bgActive}
        onClikLogin={handleClickLogin}
      />
      <Menu
        isOpen = {isOpen}
        onClickMenu = {handleClickHamburger}
      />
    </>
)
}

export default MenuHeader;
