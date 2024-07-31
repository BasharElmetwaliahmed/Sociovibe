import React from 'react'
import Logo from '../Logo';
import Search from '../Search';

function Header() {
  return (
    <header className=" py-6 fixed   w-screen  px-2   border-b-lightDark border-b-[2px] top-0 bg-dark  z-[2] left-1/2 -translate-x-1/2">
      <div className="container flex mx-auto justify-between ">
        <Logo />
        <Search />
      </div>
    </header>
  );
}

export default Header