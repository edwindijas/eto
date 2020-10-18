import React from "react";
import classes from "./index.module.scss";
import {NavLink} from "react-router-dom";
import {IcoHome} from "../icons/IcoHome";
import {IcoHelp} from "../icons/IcoHelp";
import {IcoArrowBack} from "../icons/IcoArrowBack";

export const Header = () => {
    return <header className={classes.header} >
        <div className={`${classes.wrapper} max-wrapper`}>
            <NavLink to="/" className={classes.lnk} >
                <IcoArrowBack />
            </NavLink>
            <h1 className={classes.title} >Mw ETo Calc</h1>
            <nav className={classes.nav} >
                <ul >
                    <li ><NavLink to="/" exact={true} activeClassName={classes.active} ><IcoHome /><span>Home</span></NavLink></li>
                    <li ><NavLink to="/about" activeClassName={classes.active} ><IcoHelp /><span>About</span></NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
}