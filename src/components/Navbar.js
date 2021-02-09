import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import styles from '../assets/Styles.module.css' ;

import { ReactComponent as BellIcon} from './../icons/bell.svg';
import { ReactComponent as ArrowIcon} from './../icons/arrow.svg';
import { ReactComponent as BoltIcon} from './../icons/bolt.svg';
import { ReactComponent as CaretIcon} from './../icons/caret.svg';
import { ReactComponent as ChevronIcon} from './../icons/chevron.svg';
import { ReactComponent as CogIcon} from './../icons/cog.svg';
import { ReactComponent as MessengerIcon} from './../icons/messenger.svg';
import { ReactComponent as PlusIcon} from './../icons/plus.svg';
import { ReactComponent as ProfileIcon} from './../icons/profile.svg';

class NavigationBar extends React.Component {
    render() {
        return (
            <div>
                <Navbar>
                <NavItem icon={<PlusIcon />}></NavItem>
                
                <NavItem icon={<CaretIcon />}>
                    <DropdownMenu />
                </NavItem>
                </Navbar>
            </div>
        )    
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
            <a href="#" className={styles.icon_button} onClick={() => setOpen(!open)}> 
                {props.icon} 
            </a>

            {open && props.children}
        </li>
    );
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
    
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <a href="#" className={styles.menu_item} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className={styles.icon_button}>{props.leftIcon}</span>
                {props.children}
                <span className={styles.icon_right}>{props.rightIcon}</span>
            </a>
        );
    }

    return (
        <div className={styles.dropdown}>
            <div className={styles.menu}>
                <DropdownItem
                    leftIcon={<ProfileIcon />}
                    rightIcon={<ChevronIcon />}>
                        My Profile
                </DropdownItem>
                <DropdownItem 
                    leftIcon={<CogIcon />}
                    rightIcon={<ChevronIcon />}>
                        Dashboard
                </DropdownItem>
                <DropdownItem 
                    leftIcon={<CogIcon />}
                    rightIcon={<ChevronIcon />}>
                        Applications
                </DropdownItem>
                <DropdownItem 
                    leftIcon={<CogIcon />}
                    rightIcon={<ChevronIcon />}>
                        Interviews
                </DropdownItem>
                <DropdownItem 
                    leftIcon={<CogIcon />}
                    rightIcon={<ChevronIcon />}>
                        Documents
                </DropdownItem>
                <DropdownItem 
                    leftIcon={<CogIcon />}
                    rightIcon={<ChevronIcon />}>
                        Settings
                </DropdownItem>
            </div>
        </div>
    );
}

export default NavigationBar;
  