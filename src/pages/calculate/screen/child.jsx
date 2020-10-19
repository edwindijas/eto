import React, {useState} from "react";
import classes from "./index.module.scss";
import {IcoMaximise} from "../../../components/icons/IcoMaximise";
export const ChildScreen = (props) => {
    const [fullScreen, changeFullScreen] = useState(false);
    const toggleFull = () => {
        changeFullScreen(state => !state);
    }
    return <div className={`${classes.childWindow} ${fullScreen ? classes.fullScreen : ""} `} >
        <div className={classes.buttons} >
            <button onClick={toggleFull} className={classes.maximise} ><IcoMaximise /></button>
        </div>
        <div className={classes.childWrapper} >
            {props.children}
        </div>
       
    </div>
}