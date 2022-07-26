import React, { useState } from "react";
import { episodes } from "../fakeStorage/episodes.js";
import { Episode } from "./Episode.jsx";
import { Pagination } from "./Pagination.jsx";
import paginate from "../utils/paginate";

export const EpisodesList = () => {
    const count = episodes.length;
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const episodesCrop = paginate(episodes, currentPage, pageSize);

    return (
        <div className="container">
            <div className="row">
                {episodesCrop.map((episode) => (
                    <Episode key={episode.id} {...episode} />
                ))}
            </div>
            <div className="row">
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};
