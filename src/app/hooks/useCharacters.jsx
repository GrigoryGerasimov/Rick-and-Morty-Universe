import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { characterService } from "../services";
import Loader from "../components/Loader.jsx";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const CharactersContext = React.createContext();

export const useCharacters = () => useContext(CharactersContext);

export const CharactersProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [charactersData, setCharactersData] = useState([]);
    const [singleCharacterData, setSingleCharacterData] = useState({});

    const errorCatcher = useCallback(error => {
        toast.error(error.response.data.error);
    }, []);

    const getAllCharacters = async(page = 1) => {
        try {
            const data = await characterService.getAll(page);
            setCharactersData(data);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredCharactersByName = async(name = "", page = 1) => {
        try {
            const data = await characterService.getFilteredByName(name, page);
            setCharactersData(data);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getSingleCharacterById = async id => {
        try {
            const data = await characterService.get(id);
            setSingleCharacterData(data);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getMultipleCharactersById = async(...id) => {
        try {
            const data = await characterService.get(id);
            return !Array.isArray(data) && typeof data === "object" ? [data] : data;
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        getAllCharacters();
    }, []);

    return (
        <CharactersContext.Provider value={useMemo(() => ({
            singleCharacterData,
            charactersData,
            getAllCharacters,
            getSingleCharacterById,
            getMultipleCharactersById,
            getFilteredCharactersByName
        }), [
            singleCharacterData,
            charactersData,
            getAllCharacters,
            getSingleCharacterById,
            getMultipleCharactersById,
            getFilteredCharactersByName
        ])}>
            {!isLoading ? children : <Loader/>}
        </CharactersContext.Provider>
    );
};

CharactersProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
