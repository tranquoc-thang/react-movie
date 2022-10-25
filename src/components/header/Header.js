import React, { useEffect, useRef, useContext } from "react";

import { UserContext } from "../../App";

import { Link, useLocation } from "react-router-dom";

import "./header.scss";

import logo from "../../assets/tmovie.png";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
  {
    display: "Cast",
    path: "/cast",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const { pathname } = useLocation();

  const { user, setUser } = useContext(UserContext);

  const active = headerNav.findIndex((e) => e.path === pathname);

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => window.removeEventListener("scroll", shrinkHeader);
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">MoviesHD</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
          {user ? (
            <li>
              <Link className="user__logging" onClick={logout}>
                Logout, {user.username}
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
