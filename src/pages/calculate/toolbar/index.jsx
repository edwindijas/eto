import React, {useState} from "react";
import classes from "./index.module.scss";
import {Selector} from "../../../components/selector";

export const Toolbar = (props) => {
    const districts = ["salima", "ntcheu", "chikwawa"];
    const seasons = ["wet", "dry"];
    const periods = ["daily", "monthly"];

    const [district, changeDistrict] = useState();
    const [season, changeSeason] = useState();


    return <div className={classes.toolbar} >
        <div className="max-wrapper" >
            <div className={classes.option} >
                <Selector title="district" options={districts} setValue={changeDistrict} />
            </div>
            <div className={classes.option} >
                <Selector title="season" options={seasons} setValue={changeDistrict} />
            </div>
            <div className={classes.option} >
                <Selector title="period" options={periods} setValue={changeDistrict} />
            </div>
            <div className={classes.option} >
                <Selector title="years" options={props.years} multiple={true} setValue={changeDistrict} />
            </div>
        </div>
    </div>
}