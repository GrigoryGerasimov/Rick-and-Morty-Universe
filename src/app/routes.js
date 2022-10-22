import { Episodes, Locations, Characters } from "./layouts";

export const routes = [
    {
        id: "#locations",
        path: "/locations",
        component: Locations
    },
    {
        id: "#characters",
        path: "/characters",
        component: Characters
    },
    {
        id: "#episodes",
        path: "/",
        component: Episodes
    }
];
