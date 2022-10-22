import React, { useState, useEffect, useCallback } from "react";
import { Episode } from "./Episode.jsx";
import { Pagination } from "../../../components/Pagination.jsx";
import { episodeService } from "../../../services";
import { toast } from "react-toastify";

const initEpisodesData = {
    results: [],
    info: {
        count: 0
    }
};

export const EpisodesList = () => {
    const [episodesData, setEpisodesData] = useState(initEpisodesData);
    const { results: episodes, info: { count } } = episodesData;
    const [currentPage, setCurrentPage] = useState(1);

    const errorRenderer = useCallback(error => {
        toast.error(error.response.data.error);
    }, [episodesData]);

    const getAllEpisodes = useCallback(async() => {
        try {
            const data = await episodeService.getAll(currentPage);
            setEpisodesData(data);
        } catch (error) {
            errorRenderer(error);
        }
    }, [currentPage]);

    useEffect(() => {
        getAllEpisodes();
    }, [getAllEpisodes]);

    const pageSize = 20;

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

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
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};
