import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { locationService } from "../services";
import Loader from "../components/Loader.jsx";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const LocationsContext = React.createContext();

export const useLocations = () => useContext(LocationsContext);

export const LocationsProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [locationsData, setLocationsData] = useState([]);
    const [singleLocationData, setSingleLocationData] = useState({});

    const errorCatcher = useCallback(error => {
        toast.error(error.response.data.error);
    }, []);

    const getAllLocations = async(page = 1) => {
        try {
            const data = await locationService.getAll(page);
            setLocationsData(data);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredLocationsByName = async(name = "", page = 1) => {
        try {
            const data = await locationService.getFilteredByName(name, page);
            setLocationsData(data);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getSingleLocationById = async id => {
        try {
            const data = await locationService.get(id);
            setSingleLocationData(data);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getMultipleLocationsById = async(...id) => {
        try {
            const data = await locationService.get(id);
            return !Array.isArray(data) && typeof data === "object" ? [data] : data;
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        getAllLocations();
    }, []);

    return (
        <LocationsContext.Provider value={useMemo(() => ({
            locationsData,
            singleLocationData,
            getAllLocations,
            getSingleLocationById,
            getMultipleLocationsById,
            getFilteredLocationsByName
        }), [
            locationsData,
            singleLocationData,
            getAllLocations,
            getSingleLocationById,
            getMultipleLocationsById,
            getFilteredLocationsByName
        ])}>
            {!isLoading ? children : <Loader/>}
        </LocationsContext.Provider>
    );
};

LocationsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
