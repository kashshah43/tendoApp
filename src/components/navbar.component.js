import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">H-CAPS</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Patient Login</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/details/9083427136" className="nav-link">Patient Details</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/appointment/61eb8568684906fe51144940" className="nav-link">View Appointments</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/bookappointment/61eb8568684906fe51144940" className="nav-link">Book Appointments</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}