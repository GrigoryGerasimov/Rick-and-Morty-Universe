import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const SearchContext = React.createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [data, setData] = useState({
        search: ""
    });
    const [searchValue, setSearchValue] = useState("");

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setData(prevState => ({
            ...prevState,
            [name]: value.trim()
        }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        setSearchValue(data.search);
    };

    return (
        <SearchContext.Provider value={useMemo(() => ({
            data,
            searchValue,
            handleChange,
            handleSubmit
        }), [
            data,
            searchValue,
            handleChange,
            handleSubmit
        ])}>
            {children}
        </SearchContext.Provider>
    );
};

SearchProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
