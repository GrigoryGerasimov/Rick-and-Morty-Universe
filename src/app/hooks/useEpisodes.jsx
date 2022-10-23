import React, { useCallback, useContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { episodeService } from "../services";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";

const EpisodesContext = React.createContext();

export const useEpisodes = () => useContext(EpisodesContext);

export const EpisodesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [episodesData, setEpisodesData] = useState([]);
    const [singleEpisodeData, setSingleEpisodeData] = useState({});

    const errorCatcher = useCallback(error => {
        toast.error(error.response.data.error);
    }, []);

    const getAllEpisodes = async(page = 1) => {
        try {
            const data = await episodeService.getAll(page);
            setEpisodesData(data);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredEpisodesByName = async(name = "", page = 1) => {
        try {
            const data = await episodeService.getFilteredByName(name, page);
            setEpisodesData(data);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getSingleEpisodeById = async id => {
        try {
            const data = await episodeService.get(id);
            setSingleEpisodeData(data);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getMultipleEpisodesById = async(...id) => {
        try {
            const data = await episodeService.get(id);
            return !Array.isArray(data) && typeof data === "object" ? [data] : data;
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        getAllEpisodes();
    }, []);

    return (
        <EpisodesContext.Provider value={useMemo(() => ({
            episodesData,
            singleEpisodeData,
            getAllEpisodes,
            getSingleEpisodeById,
            getMultipleEpisodesById,
            getFilteredEpisodesByName
        }), [
            episodesData,
            singleEpisodeData,
            getAllEpisodes,
            getSingleEpisodeById,
            getMultipleEpisodesById,
            getFilteredEpisodesByName
        ])}>
            {!isLoading ? children : <Loader/>}
        </EpisodesContext.Provider>
    );
};

EpisodesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
