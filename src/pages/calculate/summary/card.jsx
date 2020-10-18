import React from "react";
const prettyPrint = function (num) {
    return Number(num).toFixed(2).toString();
};

export const Card = (props) => {
    const {eto, tMax, tMean, tMin, date} = props.data;

    
    return <tr className={""} >
        <td >{props.index + 1}</td>
        <td >{date}</td>
        <td >{prettyPrint(tMin)}</td>
        <td >{prettyPrint(tMax)}</td>
        <td >{prettyPrint(tMean)}</td>
        <td >{prettyPrint(eto)}</td>
    </tr>
}