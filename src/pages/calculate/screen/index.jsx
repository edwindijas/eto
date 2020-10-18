import classes from "./index.module.scss";
import React from "react";
import {ChildScreen} from "./child";
export const Screen = (props) => {
    return <div className={classes.screen} >
            <div className={classes.controls} ></div>
            <div className={classes.content} >
                <ChildScreen >
                    {props.children[0]}
                </ChildScreen>
                <ChildScreen className={classes.childWindow} >
                    {props.children[1]}
                </ChildScreen>
            </div>
    </div>
}