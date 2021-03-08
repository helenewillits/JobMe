import React, { useState, useRef, useEffect } from "react";
import styles from "../assets/Styles.module.css";
import { Link } from "react-router-dom";

import { ReactComponent as CaretIcon } from "./../icons/caret.svg";
import { ReactComponent as ChevronIcon } from "./../icons/chevron.svg";
import { ReactComponent as PlusIcon } from "./../icons/plus.svg";
import { ReactComponent as ProfileIcon } from "./../icons/profile.svg";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class AddButtonNavigationBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Link to={this.props.link}>
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

function Navbar(props) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar_nav}> {props.children} </ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.nav_item}>
      <a className={styles.icon_button} onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function AddApplication(props) {
  const [activeMenu, setActiveMenu] = useState("main");

  return (
    <a
      href="/"
      className={styles.menu_item}
      onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
    ></a>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href={props.link}
        className={styles.menu_item}
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className={styles.icon_button}>{props.leftIcon}</span>
        {props.children}
        <span className={styles.icon_right}>{props.rightIcon}</span>
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
