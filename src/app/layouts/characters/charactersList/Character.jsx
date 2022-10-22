import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useEpisodes } from "../../../hooks/useEpisodes";
import Loader from "../../../components/Loader.jsx";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Character = ({ name, status, species, type, gender, image, origin, location, episode }) => {
    const [episodes, setEpisodes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { getMultipleEpisodesData } = useEpisodes();

    const episodesId = useMemo(() => {
        return episode.map(e => e.slice(e.lastIndexOf("/") + 1));
    }, [episode]);

    const getMultipleEpisodes = useCallback(async() => {
        try {
            const episodesData = await getMultipleEpisodesData(episodesId.slice(0, 5));
            setEpisodes(episodesData);
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }, [getMultipleEpisodesData, episodesId]);

    useEffect(() => {
        getMultipleEpisodes();
    }, [getMultipleEpisodes]);

    return (
        <div className="col-4 mb-2">
            <div className="card characters-card">
                <img className="card-img-top" src={image} alt="avatar"/>
                <div className="card-body">
                    <h5 className="card-title fs-6">
                        Name:{" "}
                        <span className="text-muted">{name}</span>
                    </h5>
                    <h5 className="card-title fs-6">
                        Status:{" "}
                        <span className="text-muted">{status}</span>
                    </h5>
                    <h5 className="card-title fs-6">
                        Species:{" "}
                        <span className="text-muted">{species}</span>
                    </h5>
                    <h5 className="card-title fs-6">
                        Type:{" "}
                        <span className="text-muted">{!type ? "unknown" : type}</span>
                    </h5>
                    <h5 className="card-title fs-6">
                        Gender:{" "}
                        <span className="text-muted">{gender}</span>
                    </h5>
                    <h5 className="card-title fs-6">
                        Origin:{" "}
                        <span className="text-muted">{origin.name}</span>
                    </h5>
                    <h5 className="card-title fs-6">
                        Location:{" "}
                        <span className="text-muted">{location.name}</span>
                    </h5>
                    <h5 className="card-title fs-6">
                        Appeared in:
                    </h5>
                    {!isLoading ? (
                        <ul>
                            {episodes.map(({ id, episode, name }) => (
                                <li key={id} className="card-subtitle mb-2 text-muted small">{episode} - {name}</li>
                            ))}
                            {episodesId.length > 5 && <h6>and others...</h6>}
                        </ul>
                    ) : <Loader/>}
                </div>
            </div>
        </div>
    );
};

export default Character;

Character.propTypes = {
    name: PropTypes.string,
    status: PropTypes.string,
    species: PropTypes.string,
    type: PropTypes.string,
    gender: PropTypes.string,
    image: PropTypes.string,
    origin: PropTypes.object,
    location: PropTypes.object,
    episode: PropTypes.array
};
