import React from "react";
import PropTypes from "prop-types";

export const Breadcrumbs = ({ page, onGoMain }) => {
    const isMainPage = page.id === "main";
    const mainClasses = "breadcrumb-item " + (isMainPage && "active");

    return (
        <nav>
            <ol className="breadcrumb">
                <li className={mainClasses} onClick={onGoMain}>
                    Main
                </li>
                {!isMainPage && (
                    <li className="breadcrumb-item active" aria-current="page">
                        {page.text}
                    </li>
                )}
            </ol>
        </nav>
    );
};

Breadcrumbs.propTypes = {
    page: PropTypes.object.isRequired,
    onGoMain: PropTypes.func.isRequired
};
