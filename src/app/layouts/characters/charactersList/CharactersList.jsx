import React, { useEffect, useState, useMemo } from "react";
import { Pagination } from "../../../components/Pagination";
import { useCharacters } from "../../../hooks/useCharacters";
import Character from "./Character.jsx";

const CharactersList = () => {
    const { charactersData, getAllCharacters } = useCharacters();
    const { results: characters, info: { pages } } = useMemo(() => charactersData, [charactersData]);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        getAllCharacters(currentPage);
    }, [currentPage]);

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
