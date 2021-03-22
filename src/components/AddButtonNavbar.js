import React, { useState, useRef, useEffect } from "react";
import styles from "../assets/Styles.module.css";
import { Link } from "react-router-dom";

import { ReactComponent as CaretIcon } from "./../icons/caret.svg";
import { ReactComponent as PlusIcon } from "./../icons/plus.svg";
import { ReactComponent as ProfileIcon } from "./../icons/profile.svg";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PropTypes from "prop-types";

class AddButtonNavigationBar extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.any,
      onClickOut: PropTypes.func
    };
  }

  render() {
    return (
      <div>
        <Navbar>
          <Link to={this.propTypes.link}>
            <NavItem icon={<PlusIcon />}></NavItem>
          </Link>

          <NavItem icon={<CaretIcon />}>
            <DropdownMenu />
          </NavItem>
        </Navbar>
      </div>
    );
  }
}

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar_nav}> {this.propTypes.children} </ul>
    </nav>
  );
}

function NavItem() {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.nav_item}>
      <a className={styles.icon_button} onClick={() => setOpen(!open)}>
        {this.propTypes.icon}
      </a>

      {open && this.propTypes.children}
    </li>
  );
}

// function AddApplication(props) {
//   const [activeMenu, setActiveMenu] = useState("main");

//   return (
//     <a
//       href="/"
//       className={styles.menu_item}
//       onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
//     ></a>
//   );
// }

function DropdownMenu() {
  //   const [activeMenu, setActiveMenu] = useState("main");
  //   const [menuHeight, setMenuHeight] = useState(null);
  const setActiveMenu = useState("main");
  const setMenuHeight = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  //   function calcHeight(el) {
  //     const height = el.offsetHeight;
  //     setMenuHeight(height);
  //   }

  function DropdownItem() {
    return (
      <a
        href={this.propTypes.link}
        className={styles.menu_item}
        onClick={() =>
          this.propTypes.goToMenu && setActiveMenu(this.propTypes.goToMenu)
        }
      >
        <span className={styles.icon_button}>{this.propTypes.leftIcon}</span>
        {this.propTypes.children}
        {/* <span className={styles.icon_right}>{props.rightIcon}</span> */}
      </a>
    );
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.menu}>
        <DropdownItem link={"/profile"} leftIcon={<ProfileIcon />}>
          My Profile
        </DropdownItem>
        <DropdownItem link={"/applications"} leftIcon={<LibraryBooksIcon />}>
          Applications
        </DropdownItem>
        <DropdownItem link={"/interviews"} leftIcon={<PeopleAltIcon />}>
          Interviews
        </DropdownItem>
        <DropdownItem link={"/logout"} leftIcon={<ExitToAppIcon />}>
          Logout
        </DropdownItem>
      </div>
    </div>
  );
}

export default AddButtonNavigationBar;
