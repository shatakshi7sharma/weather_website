import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

const RenderRoutes = ({
    routes = [
        {
            path: "/",
            component: () => <></>,
            title: ''
        },
    ],
}) => (
    <Fragment>
        {routes.map((route, routeIdx) => (
            <Routes key={routeIdx} >
                <Route path={route.path} element={<route.component />} />
            </Routes>
        ))}
    </Fragment>
);
export default RenderRoutes;