import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

//The admin navbar. Displays admin only pages to edit part of the database. (Only specific users will be accepted as admins)
class AdminNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className="navbar">
        <Navbar dark expand="md">
          <NavbarBrand href="/admin/">Admin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/admin/">Add Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin/search">Find Products to Edit</NavLink>
              </NavItem>
            </Nav>
            <NavbarText></NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default AdminNavigation;
