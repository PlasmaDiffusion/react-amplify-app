import React, {useState} from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavLink, NavItem, NavbarToggler, NavbarBrand,
  Collapse, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./auth/logout-button";
import LoginButton from "./auth/login-button";
import Profile from "./profile";
import SearchBar from "./searchComponents/searchBar";

//A navbar that can display links only if logged in.
//The name of the current page you're on can be passed in as a prop to highlight a specific link.
const AuthNav = (props) => {
  const { isAuthenticated } = useAuth0();

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  //Get a css class for either being a current or regular webpage link
  const checkIfInThisNav = (navName) => {
    return (props.title == navName) ? "navItemCurrent" : "navItem";
  }

  return (
    <React.Fragment>
        <div className="mobileNav"> {/* Mobile only toggleable navbar below */}
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">{props.title}</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
            <NavItem >
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="/search/?search=default">Catalogue</NavLink>
            </NavItem>

            <NavItem >
              <NavLink href="/support">Support</NavLink>
            </NavItem>

            <NavItem >
              {isAuthenticated ? <NavLink href="/cart">Cart</NavLink> : ""}
            </NavItem>
            </Nav>
          </Collapse>

        </Navbar>
          <Navbar>


            <div className="navBar">{props.noLogin ? "" : <Profile />}</div>
            
            <div className="navBar">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>

        </Navbar>
      </div>
      <div className="desktopNav"> {/* Desktop only navbar below */}
      <div className="navbar">
        <Nav className="justify-content-start">
          <NavItem className={checkIfInThisNav("Home")}>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem className={checkIfInThisNav("Catalogue")}>
            <NavLink href="/search/?search=default">Catalogue</NavLink>
          </NavItem>

          <NavItem className={checkIfInThisNav("Support")}>
            <NavLink href="/support">Support</NavLink>
          </NavItem>

          <NavItem className={checkIfInThisNav("Cart")}>
            {isAuthenticated ? <NavLink href="/cart">Cart</NavLink> : ""}
          </NavItem>
        </Nav>
        <Nav className="justify-content-end">
          <NavItem>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </NavItem>

          <NavItem>{props.noLogin ? "" : <Profile />}</NavItem>
        </Nav>
      </div>
      </div>
      <div className="tab"></div>
      <div
        className="justify-content-center"
        style={{ backgroundColor: "#f3a154" }}
      >
        <SearchBar searchResults={false} />
      </div>


    </React.Fragment>
  );
};

export default AuthNav;
