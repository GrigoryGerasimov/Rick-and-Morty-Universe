import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./ui/Navbar.jsx";
import { routes } from "./routes.js";
import { CharactersProvider } from "./hooks/useCharacters.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => (
    <>
        <CharactersProvider>
            <Navbar/>
            <Switch>
                {routes.map(({ id, path, component }) => <Route key={id} path={path} component={component}/>)}
            </Switch>
        </CharactersProvider>
        <ToastContainer/>
    </>
);
