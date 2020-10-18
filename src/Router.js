import React from "react";
import {Route, BrowserRouter as Router} from "react-router-dom";
import {Home} from "./pages/home";
import {Calculate} from "./pages/calculate";
import {Header} from "./components/header";

export const EpoRouter = () => (<Router >
    <Header />
    <main >
        <Route component={Home} path="/" exact={true} />
        <Route path="/calculate/district/:district/season/:season/period/:period" component={Calculate} />
    </main>
</Router>);