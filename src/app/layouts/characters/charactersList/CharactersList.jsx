import React, { useEffect, useState } from "react";
import { Pagination } from "../../../components/Pagination";
import { useCharacters } from "../../../hooks/useCharacters";
import { useSearch } from "../../../hooks/useSearch.jsx";
import Character from "./Character.jsx";

const CharactersList = () => {
    const { charactersData, getFilteredCharactersByName } = useCharacters();
    const { results: characters, info: { pages } } = charactersData;
    const [currentPage, setCurrentPage] = useState(1);
    const { searchValue } = useSearch();

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchValue]);

    useEffect(() => {
        getFilteredCharactersByName(searchValue, currentPage);
    }, [searchValue, currentPage]);

    return (
        <div className="container">
            <div className="row">
                {characters.map((character) => (
                    <Character
                        key={character.id}
                        {...character}
                    />
                ))}
            </div>
            <div className="row">
                <Pagination
                    pages={pages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default CharactersList;
