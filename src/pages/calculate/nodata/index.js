
import React, {useState, createRef} from "react";
import classes from "./index.module.scss";
import XSXL from "xlsx";
import {IcoProcessing} from "../../../components/icons/IcoProcessing";
import {IcoForward} from "../../../components/icons/IcoForward";
export const NoData = (props) => {
    const inputRef = createRef();
    const [processing, changeProcessing] = useState(false);
    const loadData = function () {
        const file = inputRef.current.files[0];
        changeProcessing(true);
        
        if (!file) {
            changeProcessing(false);
            return;
        }


        const reader = new FileReader()
        reader.onload = function (e) {
            const data = e.target.result;
            const xlsx = XSXL.read(data, {type: "binary"});
            const expoData = {};
            xlsx.SheetNames.forEach(name => {
                const jsonData = XSXL.utils.sheet_to_json(xlsx.Sheets[name]);
                expoData[name.toLowerCase()] = jsonData;
            });
            props.changeData(expoData);
        }

        reader.readAsBinaryString(file);
        
    }

    const importFile = () => {
        inputRef.current.click();
    }

    return <div className="max-wrapper">
        <form style={{display: "none"}} >
            <input type='file' onChange={loadData} ref={inputRef}  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        </form>
        <div className={classes.title} >{processing === true ? "Loading File" : "No Data Available"}</div>
        {processing && <div className={classes.processing} >
            <IcoProcessing />
        </div>}
        {!processing && <div >
            <button className={classes.btn} onClick={importFile} >Import Excel File <div className={classes.fig}><IcoForward /></div></button>
            <button className={classes.btn} >Manual Entry <div className={classes.fig} ><IcoForward /></div></button>
        </div>}
    </div>
}