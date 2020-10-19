import React, {useState} from "react";
import classes from "./index.module.scss";
import {IcoForward} from "../../components/icons/IcoForward";

let hasActive = false;
let superDeactivate;

export const Selector = (props) => {

    const {background, firstChild, multiple, max} = props;
    const [active, setActive] = useState(props.default || undefined);
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
        if (multiple) {
            if (active && active.length === max && active.indexOf(option) !== -1) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (active !== undefined && active.indexOf(option) === -1) {
                option = [option];
                option = [...active, ...option];
            } else if (active !== undefined) {
                active.splice(active.indexOf(option), 1);
                option = [...active];
            } else {
                option = [option]
            }
        }

        setActive(option);
        changeParState(option);
        //changeShow(false);
        e.preventDefault();
        e.stopPropagation();
    };

    

    const deactivate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        changeShow(false);
        hasActive = false;
    }

    const activate = (e) => {
        if (hasActive === true) {
            superDeactivate(e);
            return;
        }
        changeShow(true);
        superDeactivate = deactivate;
        hasActive = true;
    }


    return <div className={`${classes.wrapper} 
        ${background === false ? classes.noBackground : ''}
        ${firstChild === true ? classes.firstChild : ''}
        `} >
        <div className={`${classes.selector} 
            ${active? classes.active : ""} 
            ${show ? classes.processing : ''}`} 
            onClick={activate} >
            {show &&
                <div className={classes.fixer} onClick={deactivate} ></div>}
            {props.title && active && <p className={classes.title}>{props.title}</p>}
            
            <div className={classes.fig} ><IcoForward /></div>
            {(!active || (multiple && active.length === 0)) && <p className={classes.label} > {props.title}</p>}
            {active && (!multiple || active.length > 0)  && <p className={classes.label} > {
                multiple ? active.join('-') : active
            }</p>}
            <div className={[classes.optionSelector]} >
                {props.options &&
                    <ul className={`${classes.main} ${show ? classes.active : ''}`} >
                        {props.options.map((option, key) => (
                            <li 
                                onClick={ (e) => clickFunc(e, option) }
                                key={key}
                                className={`${classes.option}  
                                    ${(active === option || (multiple && active && active.indexOf(option) > -1) ? classes.active : '')}`}
                            ><span >{option}</span></li>
                        ))}
                    </ul>
                }
                
            </div>
        </div>
        {!active && props.validate && 
            <div className={classes.error}>
                {props.title} is required.
            </div>}
    </div>
}