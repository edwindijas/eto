import React from "react";
import summary from "./summary.module.scss";
import {Card} from "./card";
//import {AddData} from "../addData";

export const Summary = (props) => {
    const {data} = props;
    //changeData
    console.log(data);
    
    const  displayData  = (from, to) => {
        return data.slice(from, to).map(
            (data, index) => {
                return <Card  key={index} index={index + from} data={data} />
            }
        )
    }


    return  <div className={summary.wrapper}>
        <div className={summary.fixWidth} >
            <table className={summary.table}>
                <thead className={summary.header} >
                    <tr>
                        <th >No</th>
                        <th >Date</th>
                        <th >Tmin</th>
                        <th >Tmax</th>
                        <th >Tmean</th>
                        <th >ETo</th>
                    </tr>
                </thead>
                <tbody>
                    {(!data || data.length === 0) && <tr><td colSpan="6" className={summary.info} >No data available</td></tr>}
                    {data && displayData(0, data.length)}
                </tbody>
            </table>
        </div>
        {/*<AddData changeData={changeData} />*/}
    </div>;
}