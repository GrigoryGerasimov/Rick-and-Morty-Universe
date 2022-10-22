import React from "react";

const SearchForm = () => {
    return (
        <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search"/>
            <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
