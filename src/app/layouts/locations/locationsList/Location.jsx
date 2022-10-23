import React, { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import { useCharacters } from "../../../hooks/useCharacters.jsx";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Location = ({ name, type, dimension, residents }) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { getMultipleCharactersById } = useCharacters();

    const residentsId = useMemo(() => {
        return residents.map(resident => resident.slice(resident.lastIndexOf("/") + 1));
    }, [residents]);

    const getMultipleCharacters = useCallback(async() => {
        try {
            const charactersData = await getMultipleCharactersById(residentsId.slice(0, 5));
            setCharacters(charactersData);
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }, [getMultipleCharactersById, residentsId]);

    useEffect(() => {
        getMultipleCharacters();
    }, [getMultipleCharacters]);

    return (
        <div className="col-4 mb-2">
            <div className="card locations-card">
                <div className="card-body">
                    <h5 className="card-title fs-6">
                        {name}
                    </h5>
                    <h5 className="card-title fs-6">
                        {type}
                    </h5>
                    <h6 className="card-subtitle my-3 text-muted small">
                        {dimension}
                    </h6>
                    <h6 className="card-subtitle my-3 text-muted small">
                        Residents:
                    </h6>
                    {!isLoading ? (
                        <ul>
                            {characters.map(({ id, name }) => id ? (
                                <li key={`loc_${id}`} className="card-subtitle mb-2 text-muted small">
                                    {name}
                                </li>
                            ) : "N/A")}
                            {residentsId.length > 5 && <h6>and many many others...</h6>}
                        </ul>
                    ) : <Loader/>}
                </div>
            </div>
        </div>
    );
};

export default Location;

Location.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    dimension: PropTypes.string,
    residents: PropTypes.array
};
