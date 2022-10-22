import React, { useState, useEffect, useMemo } from "react";
import { Episode } from "./Episode.jsx";
import { Pagination } from "../../../components/Pagination.jsx";
import { useEpisodes } from "../../../hooks/useEpisodes.jsx";

const EpisodesList = () => {
    const { episodesData, getAllEpisodes } = useEpisodes();
    const { results: episodes, info: { pages } } = useMemo(() => episodesData, [episodesData]);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        getAllEpisodes(currentPage);
    }, [currentPage]);

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
