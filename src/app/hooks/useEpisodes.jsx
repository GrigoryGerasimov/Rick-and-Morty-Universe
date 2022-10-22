import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { episodeService } from "../services";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";

const EpisodesContext = React.createContext();

export const useEpisodes = () => useContext(EpisodesContext);

export const EpisodesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [episodesData, setEpisodesData] = useState({});
    const [singleEpisodeData, setSingleEpisodeData] = useState({});
    const [multipleEpisodesData, setMultipleEpisodesData] = useState([]);

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

    const getSingleEpisodeData = async id => {
        try {
            const data = episodeService.get(id);
            setSingleEpisodeData(data);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getMultipleEpisodesData = async(...id) => {
        try {
            const data = episodesData.get(id);
            setMultipleEpisodesData(data);
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        getAllEpisodes();
    }, []);

    return (
        <EpisodesContext.Provider value={{
            episodesData,
            singleEpisodeData,
            multipleEpisodesData,
            getAllEpisodes,
            getSingleEpisodeData,
            getMultipleEpisodesData
        }}>
            {!isLoading ? children : <Loader/>}
        </EpisodesContext.Provider>
    );
};

EpisodesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
