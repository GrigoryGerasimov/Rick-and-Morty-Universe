import React, { useState, useEffect } from "react";
import { fetchAll, fetchYears } from "../fakeApi/episodesApi.js";
import { Episode } from "./Episode.jsx";
import { Pagination } from "./Pagination.jsx";
import paginate from "../utils/paginate";
import { GroupList } from "./GroupList.jsx";

export const EpisodesList = () => {
    const [episodes, setEpisodes] = useState([]);
    const [years, setYears] = useState([]);
    const [filter, setFilter] = useState();
    const getEpisodes = (year) => {
        fetchAll(year).then((response) => setEpisodes(response));
        setCurrentPage(1);
    };
    useEffect(() => {
        getEpisodes(filter);
    }, [filter]);
    useEffect(() => {
        fetchYears().then((response) =>
            setYears([...response, { text: "Все эпизоды" }])
        );
    }, []);
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };
    const count = episodes.length;
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const episodesCrop = paginate(episodes, currentPage, pageSize);
    const handleReset = () => {
        setFilter();
    };

    return (
        <div className="container pt-2">
            <div className="row">
                <div className="col-4">
                    {years.length && (
                        <>
                            <GroupList
                                items={years}
                                filter={filter}
                                onChangeFilter={handleFilterChange}
                            />
                            <hr />
                            <div className="d-grid">
                                <button
                                    className="btn btn-m btn-warning"
                                    onClick={handleReset}
                                >
                                    Очистить
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div className="col-8">
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
            </div>
        </div>
    );
};
