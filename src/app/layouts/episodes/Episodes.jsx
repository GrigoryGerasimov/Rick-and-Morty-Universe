import React from "react";
import { EpisodesList } from "./episodesList/EpisodesList.jsx";
import { EpisodesProvider } from "../../hooks/useEpisodes.jsx";

const Episodes = () => {
    return (
        <EpisodesProvider>
            <EpisodesList/>
        </EpisodesProvider>
    );
};

export default Episodes;
