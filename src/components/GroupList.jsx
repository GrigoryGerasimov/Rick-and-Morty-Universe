import React from "react";
import PropTypes from "prop-types";

export const GroupList = ({
    items,
    filter,
    valueProp,
    contentProp,
    onChangeFilter
}) => {
    return (
        <div className="list-group">
            {items.map((item) => (
                <button
                    key={item[contentProp]}
                    className={`list-group-item list-group-item-action ${
                        item[valueProp] === filter && "active"
                    }`}
                    onClick={() => onChangeFilter(item[valueProp])}
                >
                    {item[contentProp]}
                </button>
            ))}
        </div>
    );
};

GroupList.defaultProps = {
    valueProp: "id",
    contentProp: "text"
};

GroupList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string,
    onChangeFilter: PropTypes.func.isRequired,
    valueProp: PropTypes.string.isRequired,
    contentProp: PropTypes.string.isRequired
};
