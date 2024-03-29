import Link from 'next/link';
import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./Header.module.scss";

const Header = () =>  {

  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
      width: undefined,
      height: undefined,
  });

  useEffect(() => {
      const handleResize = () => {
          setSize({
              width: window.innerWidth,
              height: window.innerHeight,
          });
      };
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
      if (size.width > 768 && menuOpen) {
          setMenuOpen(false);
      }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
      setMenuOpen((p) => !p);
  };

  const ctaClickHandler = () => {
      menuToggleHandler();
  };


  return (
      <div style={{paddingBottom: '100px'}}>
        <header className={classes.header}>
            <div className={classes.header__content}>
                <Link href="/" className={classes.header__content__logo}>
                   <h1>Hasibul</h1>
                </Link>
                <nav
                    className={`${classes.header__content__nav} ${
                        menuOpen && size.width < 768 ? classes.isMenu : ""
                    }`}
                >
                    <ul>
                        <li>
                            <Link href="#projects" onClick={menuToggleHandler}>
                                <h3>Projects</h3>
                            </Link>
                        </li>
                        <li>
                            <Link href="#tech" onClick={menuToggleHandler}>
                                <h3>Technologies</h3>
                            </Link>
                        </li>
                        <li>
                            <Link href="#about" onClick={menuToggleHandler}>
                                <h3>About</h3>
                            </Link>
                        </li>
                    </ul>
                    <button onClick={ctaClickHandler}><h2>Resume</h2></button>
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
      </div>
  )
}

export default Header;
