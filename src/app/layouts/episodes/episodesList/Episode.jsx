import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useCharacters } from "../../../hooks/useCharacters.jsx";
import Loader from "../../../components/Loader.jsx";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export const Episode = ({ name, air_date: airDate, episode, characters: charactersInEpisode }) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { getMultipleCharactersById } = useCharacters();

    const charactersId = useMemo(() => {
        return charactersInEpisode.map(character => character.slice(character.lastIndexOf("/") + 1));
    }, [charactersInEpisode]);

    const getMultipleCharacters = useCallback(async() => {
        try {
            const charactersData = await getMultipleCharactersById(charactersId.slice(0, 5));
            setCharacters(charactersData);
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    },[getMultipleCharactersById, charactersId]);

    useEffect(() => {
        getMultipleCharacters();
    }, [getMultipleCharacters]);

    return (
        <div className="col-4 mb-2">
            <div className="card episodes-card">
                <div className="card-body">
                    <h5 className="card-title fs-6">
                        {episode}
                    </h5>
                    <h5 className="card-title fs-6">
                        {name}
                    </h5>
                    <h6 className="card-subtitle my-3 text-muted small">
                        {airDate}
                    </h6>
                    {!isLoading ? (
                        <ul>
                            {characters.map(({ id, name }) => (
                                <li key={id} className="card-subtitle mb-2 text-muted small">
                                    {name}
                                </li>
                            ))}
                            {charactersId.length > 5 && <h6>and others...</h6>}
                        </ul>
                    ) : <Loader/>}
                </div>
            </div>
        </div>
    );
};

Episode.propTypes = {
    name: PropTypes.string,
    air_date: PropTypes.string,
    episode: PropTypes.string,
    characters: PropTypes.array
};
