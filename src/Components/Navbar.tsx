"use client";
import React, { Dispatch, useState } from "react";
import useMediaQuery from "../store/hook";
import menuIcon from "../assets/menu-3-fill.svg";
import closeIcon from "../assets/close.svg";
import { Link,useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";

import {IoLogOut} from 'react-icons/io5'

const LinkC = ({
  page,
  selectedPage,
  setSelectedPage,
  isMenuToggled,
  setIsMenuToggled,
}: {
  page: string;
  selectedPage: string;
  setSelectedPage: Dispatch<string>;
  setIsMenuToggled?: Dispatch<boolean>;
  isMenuToggled?: boolean;
}) => {
  function setPageAndToggle() {
    setSelectedPage(page);
    if (isMenuToggled !== undefined && setIsMenuToggled !== undefined) {
      setIsMenuToggled(!isMenuToggled);
    }
  }

  console.log(selectedPage, page);
  return (
    <Link
      className={`  sm:text-[16px] ${
        selectedPage === page ? "text-[#73D043] " : ""
      }
        hover:text-yellow transition duration-500`}
      to={`/${page}`}
      onClick={setPageAndToggle}
    >
      {page}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveSmallScreens = useMediaQuery("(min-width:1000px)");
  const [selectedPage, setSelectedPage] = useState("/");
  const navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem('token')
    navigate('/Home')
  }

  return (
    <nav
      className={`
        
       z-40  w-full  fixed top-0 py-6 `}
    >
      <div className="flex  items-center justify-between mx-auto w-5/6 ">
        <Link to="/Home" className="flex justify-center items-center">
          <FaClipboardList
            fill="#61fc14"
            className="hover:text-green w-4 h-4 sm:w-8 sm:h-8 "
          />
        </Link>

        {/* DESKTOP NAVBAR */}
        {isAboveSmallScreens ? (
          <div className="flex flex-1 items-center  gap-0  md:gap-0 text-md  ">
            <div className="flex flex-1  justify-center pt-2 md:gap-5 lg:gap-7 xl:gap-14">
              <LinkC
                page="Home"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <LinkC
                page="Todos"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <LinkC
                page="Create-Todo"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </div>
            <div className="flex justify-end gap-x-10 items-center ">
              <div className="relative flex justify-center items-center">
                {/* <button onClick={logout}>
                    Logout
                </button> */}
                <button
                  onClick={logout}
                  className="bg-[#73D043] hover:bg-[#61fc14] text-left text-sm sm:text-base relative  mx-auto shadow-inner text-white w-fit p-1 px-8 sm:px-10 font-semibold "
                >
                  Logout
                  <div className="w-4 h-4 sm:w-5 sm:h-5  rounded-full absolute right-2 bottom-1.5">
                    <IoLogOut
                      fill="white"
                      className="hover:bg-black w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                    />
                  </div>
                </button>
              </div>

              {/* <div className="bg-gray-200 relative h-11 w-11 p-1 flex justify-center items-center rounded-full ">
                <img
                  className=""
                  src={cart}
                  width={25}
                  height={25}
                  alt="cart icon"
                />
                <p className="absolute flex justify-center items-center  bg-red-500 text-white top-0 right-1 h-5 w-5 text-[12px] rounded-full">
                  0
                </p>
              </div> */}
            </div>
          </div>
        ) : (
          <button
            className="rounded-full bg-red p-2"
            onClick={() => setIsMenuToggled(!isMenuToggled)}
          >
            <img src={menuIcon} alt="menu-icon" />
          </button>
        )}

        {/* MOBILE MENU POPUP */}
        {!isAboveSmallScreens && isMenuToggled && (
          <div className="   fixed bg-white z-50 right-0 bottom-0 h-full  w-full">
            {/* CLOSE ICON FOR MOBILE MENU POPUP */}
            <div className="flex justify-end p-12">
              <button
                className=""
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <img
                  className="close-icon rounded-full bg-red p-2"
                  src={closeIcon}
                  width={43}
                  alt="close-icon"
                />
              </button>
            </div>

            {/* MENU ITEMS */}
            <div className="font-outfit flex flex-col gap-9 justify-center items-center  text-[20px] ">
              <LinkC
                page="Home"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <LinkC
                page="Todos"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                isMenuToggled={isMenuToggled}
                setIsMenuToggled={setIsMenuToggled}
              />
              <LinkC
                page="Create-Todo"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                isMenuToggled={isMenuToggled}
                setIsMenuToggled={setIsMenuToggled}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
