import React from "react";
import classes from "./index.module.scss";
import {Selector} from "../../../components/selector";

export const Toolbar = (props) => {
    const districts = ["salima", "ntcheu", "chikwawa"];
    const seasons = ["wet", "dry"];
    const periods = ["daily", "monthly"];
    const setValue = props.setValue;
    const {district, season, period, years} = props.parameter;


    return <div className={classes.toolbar} >
        <div className={`max-wrapper ${classes.wrapper}`} >
            <div className={classes.internal}>
                <div className={classes.option} >
                    <Selector 
                        title="district" 
                        options={districts} 
                        firstChild={true} 
                        background={false} 
                        default={district} 
                        setValue={setValue} />
                </div>
                <div className={classes.option} >
                    <Selector 
                        title="season"
                        options={seasons} 
                        background={false}
                        default={season}
                        setValue={setValue}
                    />
                </div>
                <div className={classes.option} >
                    <Selector 
                        title="period"
                        options={periods}
                        background={false}
                        default={period}
                        setValue={setValue} />
                </div>
                <div className={classes.option} >
                    <Selector 
                        title="years"
                        options={props.years}
                        background={false}
                        multiple={true}
                        max={10}
                        default={years}
                        setValue={setValue}
                    />
                </div>
            </div>
        </div>
    </div>
}