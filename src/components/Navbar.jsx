import React from "react";
import { NavLink } from "./NavLink.jsx";
import PropTypes from "prop-types";

export const Navbar = ({ menuItems, onItemClick }) => {
    const renderMenu = () => (
        <ul className="nav nav-pills flex-column mb-auto">
            {menuItems.map((item) => (
                <NavLink key={item.id} {...item} onActiveChange={onItemClick} />
            ))}
        </ul>
    );

    return !menuItems.length ? (
        "Nothing to be shown"
    ) : (
        <div>{renderMenu()}</div>
    );
};

Navbar.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onItemClick: PropTypes.func.isRequired
};
