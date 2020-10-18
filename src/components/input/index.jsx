import React, {useRef, useState} from "react";

import classes from "./index.module.scss";


export default (props) => {
    const ipt = useRef();
    const baseClass = classes.input;

    const [currClass, setClass] = useState(classes.input);

    const setValue = function () {
       if (!props.setValue) {
            return;
       }
       props.setValue(ipt.current.value);

    };

    const focus = () => {
        ipt.current.focus();
    }

    const onFocus = () => {
        setClass(baseClass + " " + classes.active);
    }

    const onBlur = () => {
        if (ipt.current.value.trim() === '') {
            return  setClass(baseClass);
        }
        
        setClass(baseClass + " " + classes.passive);
    }

    return <div className={currClass} onClick={focus}>
        <fieldset >
            <label className={classes.label} ><span >{props.label}</span></label>
            <input className={classes.main} onFocus={onFocus} onBlur={onBlur} name={props.name} ref={ipt} onChange={setValue}  />
        </fieldset>
    </div>
}