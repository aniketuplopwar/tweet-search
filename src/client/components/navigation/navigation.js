import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import './navigation.scss';


export default class Navigation extends React.Component {
    render(){
        return (
            <Navbar className="primary-nav">
                <Nav>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <h3 data-auto="subnav-title-payments">Manage your payments</h3>
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}