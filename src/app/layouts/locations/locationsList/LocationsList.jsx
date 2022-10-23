import React, { useState, useEffect } from "react";
import { Pagination } from "../../../components/Pagination";
import { useLocations } from "../../../hooks/useLocations";
import Location from "./Location.jsx";
import { useSearch } from "../../../hooks/useSearch.jsx";

const LocationsList = () => {
    const { locationsData, getFilteredLocationsByName } = useLocations();
    const { results: locations, info: { pages } } = locationsData;
    const [currentPage, setCurrentPage] = useState(1);
    const { searchValue } = useSearch();

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchValue]);

    useEffect(() => {
        getFilteredLocationsByName(searchValue, currentPage);
    }, [searchValue, currentPage]);

    return (
        <div className="container">
            <div className="row">
                {locations.map((location) => (
                    <Location
                        key={location.id}
                        {...location}
                    />
                ))}
            </div>
            <div className="row">
                <Pagination
                    pages={pages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default LocationsList;
