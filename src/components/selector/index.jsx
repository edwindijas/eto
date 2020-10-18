import React, {useState} from "react";
import classes from "./index.module.scss";
import {IcoForward} from "../../components/icons/IcoForward";

export const Selector = (props) => {
    
    const [active, setActive] = useState();
    const [show, changeShow] = useState(false);
    const changeParState = option => 
        props.setValue(state => {
            const ext = {};
            if (state && state[props.title] === option) {
                return state;
            }
            ext[props.title] = option;
            return {...state, ...ext}
        });
    

    const clickFunc = (e, option) => {
        setActive(option);
        changeParState(option);
        changeShow(false);
        e.preventDefault();
        e.stopPropagation();
    };

    const activate = () => {
        changeShow(true);
    }

    const deactivate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        changeShow(false);
    }


    return <div className={classes.wrapper} ><div className={`${classes.selector} ${active? classes.active : ""} ${show ? classes.processing : ''}`} onClick={activate} >
        {show && <div className={classes.fixer} onClick={deactivate} ></div>}
        {props.title && active && <p className={classes.title}>{props.title}</p>}
        <div className={classes.fig} ><IcoForward /></div>
        <p className={classes.label} >{active || props.title}</p>
        <div className={[classes.optionSelector]} >
            {props.options &&
                <ul className={`${classes.main} ${show ? classes.active : ''}`} >
                    {props.options.map((option, key) => (
                        <li 
                            onClick={ (e) => clickFunc(e, option) }
                            key={key}
                            className={classes.option + " " + (active === option ? classes.active : '')}
                        ><span >{option}</span></li>
                    ))}
                </ul>
            }
            
        </div>
        </div>
        {!active && props.validate && <div className={classes.error}>
                {props.title} is required.
            </div>}
    </div>
}