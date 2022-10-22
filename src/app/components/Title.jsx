import React from "react";
import PropTypes from "prop-types";

const Title = ({ titleClass, label }) => {
    return (
        <h1 className={titleClass}>{label}</h1>
    );
};

export default Title;

Title.propTypes = {
    titleClass: PropTypes.string,
    label: PropTypes.string
};
