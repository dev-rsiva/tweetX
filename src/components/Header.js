import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { menuDetails } from "../utils/constants";
const Header = ({ loggedInUser, setIsUserAuthenticated }) => {
  const [display, setDisplay] = useState("feed");
  const [mobileResponsive, setMobileResponsive] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        setIsUserAuthenticated(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="py-1 shadow sticky top-0 bg-white z-50">
      <div className="pl-6 sm:pl-24 pr-6 sm:pr-12 py-2 flex justify-between items-center">
        <div
          className="cursor-pointer text-2xl font-semibold text-[#FF748D]"
          id="logo-container"
          onClick={() => navigate("/feed")}
        >
          TweetX
        </div>
        <div
          className="absolute right-6 block sm:hidden cursor-pointer"
          onClick={() => {
            setMobileResponsive(!mobileResponsive);
          }}
        >
          <FontAwesomeIcon icon={faBars} className="text-lg" />
        </div>
        <div className={`${mobileResponsive ? "block" : "hidden sm:block"}`}>
          <div
            className={`flex flex-col sm:flex-row sm:justify-between gap-3 items-start sm:items-center absolute sm:static right-0 top-14 bg-white border border-slate-100 sm:border-none sm:bg-white pr-8 pb-4 sm:pb-0 pt-4 sm:pt-0`}
          >
            <ul
              className={`flex flex-col sm:flex-row pl-4 justify-between items-center gap-6 mr-16`}
            >
              {menuDetails.map((eachItem) => {
                return (
                  <li
                    className={`cursor-pointer font-semibold ${
                      display === eachItem?.display
                        ? "text-[#FF748D]"
                        : "text-slate-400"
                    }`}
                    onClick={() => {
                      navigate(
                        eachItem?.display === "profile"
                          ? `/${loggedInUser?.displayName}/post`
                          : `/${eachItem?.display}`
                      );
                      setDisplay(eachItem?.display);
                    }}
                  >
                    {eachItem?.innerText}
                  </li>
                );
              })}
            </ul>
            <button
              className={`cursor-pointer font-semibold text-slate-400 sm:text-slate-500 sm:hover:bg-[#fd8ea4] sm:hover:text-white text-base sm:text-sm sm:bg-[#f7f7f7] pl-4 sm:pl-2 sm:pr-2 mt-[2px] sm:mt-0 py-1 rounded`}
              onClick={() => handleSignOut()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
