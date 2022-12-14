import React, { useState, useEffect } from "react";
import { Episode } from "./Episode.jsx";
import { Pagination } from "../../../components/Pagination.jsx";
import { useEpisodes } from "../../../hooks/useEpisodes.jsx";
import { useSearch } from "../../../hooks/useSearch.jsx";

const EpisodesList = () => {
    const { episodesData, getFilteredEpisodesByName } = useEpisodes();
    const { results: episodes, info: { pages } } = episodesData;
    const [currentPage, setCurrentPage] = useState(1);
    const { searchValue } = useSearch();

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchValue]);

    useEffect(() => {
        getFilteredEpisodesByName(searchValue, currentPage);
    }, [searchValue, currentPage]);

    return (
        <div className="container">
            <div className="row">
                {episodes.map((episode) => (
                    <Episode
                        key={episode.id}
                        {...episode}
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

export default EpisodesList;
