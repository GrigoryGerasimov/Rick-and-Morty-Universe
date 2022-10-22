import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm.jsx";
import Title from "../components/Title.jsx";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid m-3">
                <Link className="navbar-brand text-light" to="/episodes">
                    <Title
                        titleClass="rick-and-morty-title"
                        label="Rick and Morty Universe"
                    />
                </Link>
                <ul className="navbar me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link no-text-decoration text-light" to="/">Episodes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link no-text-decoration text-light" to="/locations">Locations</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link no-text-decoration text-light" to="/characters">Characters</Link>
                    </li>
                </ul>
                <SearchForm/>
            </div>
        </nav>
    );
};

export default Navbar;
