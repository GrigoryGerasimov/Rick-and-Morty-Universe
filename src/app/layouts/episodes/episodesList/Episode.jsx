import React from "react";
import PropTypes from "prop-types";

export const Episode = ({ name, airDate, episode }) => {
    return (
        <div className="col-4 mb-2">
            <div className="card" style={{ height: "100px" }}>
                <div className="card-body">
                    <h5 className="card-title fs-6">
                        {name} {episode}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted small">
                        {airDate}
                    </h6>
                </div>
            </div>
        </div>
    );
};

Episode.propTypes = {
    name: PropTypes.string,
    airDate: PropTypes.string,
    episode: PropTypes.string
};
