import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Selector} from "../../components/selector";
import classes from "./index.module.scss";

const districts = ["salima", "ntcheu", "chikwawa"];
const seasons = ["wet", "dry"];
const periods = ["daily", "monthly"];



export const Home  = () => {
    const [opt, setOpt] = useState({});
    const [validate, setValidate] = useState();

    const go = function (e) {
        setValidate(true);
        console.log(opt);
        if (opt.district && opt.season && opt.period) {
            //Early exit conditions met
            console.log("done");
            return;
        }
        e.preventDefault();
    }

    return <div className={classes.maxWrapper} >
        <div className="tb">
            <div className="tr">
                <div className="td">
                    <div className={classes.wrapper} >
                        <div className={classes.tinyWrapper} >
                            <p className={classes.title} >Computation Options</p>
                            
                            <div className={classes.selectors} >
                                <Selector title="district" options={districts} setValue={setOpt} validate={validate} />
                                <Selector title="season" options={seasons} setValue={setOpt} validate={validate} />
                                <Selector title="period" options={periods} setValue={setOpt} validate={validate} />
                            </div>

                            {opt && <Link onClick={go} className={classes.btn} to={`/calculate/district/${opt.district}/season/${opt.season}/period/${opt.period}`} >Calculate</Link>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
};