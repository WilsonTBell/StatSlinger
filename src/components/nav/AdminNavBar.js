import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'

export const AdminNavBar = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);
  
    return (
      <div>
        <Navbar dark>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <NavbarBrand href="/" className="me-auto">StatSlinger</NavbarBrand>
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
              <NavLink href="/matches">Matches</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/guns">My Guns</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/adminMatches">Match Management</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/admin">Add New Admin</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="" onClick={() => {localStorage.removeItem("stat_slinger")}}>Logout</NavLink>
              </NavItem>          
            </Nav>
          </Collapse>
          
        </Navbar>
      </div>
    );
}
