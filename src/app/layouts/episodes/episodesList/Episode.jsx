import React, { useEffect } from "react";
import { useCharacters } from "../../../hooks/useCharacters.jsx";
import PropTypes from "prop-types";

export const Episode = ({ name, air_date: airDate, episode, characters: charactersInEpisode }) => {
    const { multipleCharactersData: characters, getMultipleCharactersById } = useCharacters();
    const charactersId = charactersInEpisode.map(character => character.slice(character.lastIndexOf("/") + 1));

    useEffect(() => {
        getMultipleCharactersById(charactersId.slice(0, 5));
    }, []);

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
                    <ul>
                        {characters.map(({ id, name }) => (
                            <li key={id} className="card-subtitle mb-2 text-muted small">
                                {name}
                            </li>
                        ))}
                        <h6>and others...</h6>
                    </ul>
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
