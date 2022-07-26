import React from "react";
import PropTypes from "prop-types";

export const NavLink = ({ onActiveChange, id, active, link, text }) => {
    const handleClick = () => onActiveChange(id);
    const getClasses = () => {
        let classes = "nav-link ";
        return (classes += active && "active");
    };

    return (
        <>
            <li className="nav-item" onClick={handleClick}>
                <a href={link} className={getClasses()}>
                    {text}
                </a>
            </li>
        </>
    );
};

NavLink.propTypes = {
    onActiveChange: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
