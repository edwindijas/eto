
import React, {useState, createRef} from "react";
import classes from "./index.module.scss";
import XSXL from "xlsx";
import {IcoProcessing} from "../../../components/icons/IcoProcessing";

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
            let sheetName = "";
            const data = e.target.result;
            const xlsx = XSXL.read(data, {type: "binary"});
            //const json_parsed = XSXL.utils.sheet_to_json(xlsx);
            xlsx.SheetNames.forEach(name => props.district === name.toLowerCase() && (sheetName = name));

            if (!sheetName) {
                alert(`There is no sheet fro the district ${props.district}`);
                return;
            }

            

            const jsonData = XSXL.utils.sheet_to_json(xlsx.Sheets[sheetName]);

            const years = [];
            const yearData = {};
            let currentYear;
            let workingData;

            jsonData.forEach((data, index) => {
               const yy = data.YYYY;
               if (currentYear !== yy) {
                   years.push(yy);
                   if (workingData) {
                       yearData[currentYear] = workingData;
                   }
                   workingData = [];
                   currentYear = yy;
               }

               workingData.push(data);
            });

            yearData[currentYear] = workingData;

            props.changeData({
                years,
                yearData
            });

        }

        reader.readAsBinaryString(file);
        
    }

    const importFile = () => {
        inputRef.current.click();
    }

    return <div >
        <form style={{display: "none"}} >
            <input type='file' onChange={loadData} ref={inputRef}  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        </form>
        <div className={classes.title} >{processing === true ? "Loading File" : "No Data Available"}</div>
        {processing && <div className={classes.processing} >
            <IcoProcessing />
        </div>}
        {!processing && <div >
            <button className={classes.btn} onClick={importFile} >Import Excel File <div className={classes.fig}></div></button>
            <button className={classes.btn} >Manual Entry <div className={classes.fig} ></div></button>
        </div>}
    </div>
}