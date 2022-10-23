import React from "react";
import { useSearch } from "../hooks/useSearch";

const SearchForm = () => {
    const { data, handleChange, handleSubmit } = useSearch();

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                name="search"
                value={data.search}
                placeholder="Search"
                onChange={handleChange}
            />
            <button className="btn btn-outline-light me-2" type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
