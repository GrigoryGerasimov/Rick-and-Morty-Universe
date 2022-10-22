import React from "react";

const Loader = () => {
    return (
        <div className="d-flex flex-row justify-content-center mt-5">
            <div className="spinner-border"></div>
            <h4 className="ms-3">Loading...</h4>
        </div>
    );
};

export default Loader;
