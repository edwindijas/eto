import React from "react";
import Input from "../../components/input";
import classes from "./index.module.scss";

const getValue = function () {
    let value;
    return function (val) {
        return value = val ? val : value;
    }
}

const tMinFunc = getValue();
const tMaxFunc = getValue();



export const AddData = (props)  => {

    const getAllValues = function () { 

        if (!props.changeData) {
            return;
        }
        const [tMin, tMax] = [Number(tMinFunc()), Number(tMaxFunc())];
        props.changeData(data => {
            return [...data, {
                tMin,
                tMax
            }];
        });

    }

    return <div className={classes.main} >
        <Input name="tMin" label="tMin" setValue={tMinFunc} />
        <Input name="tMax" label="tMax" setValue={tMaxFunc} />
        <button onClick={getAllValues} >Enter</button>
    </div>
}