import React, {useState, useEffect} from "react";
import { Summary } from "./summary";
import classes from "./index.module.scss";
import {NoData} from "./nodata";
import {Visual} from "./visualise";
import {Screen} from "./screen";
import { Toolbar } from "./toolbar";
import {calculate} from "./models";


function skipLogic (month, season) {
   
    if (season === 'dry' && (month === 12 || month <= 4)) {  
      return true;
    } else if (season === 'wet' && (month !== 12 && month > 4 )) {
      return true;
    }
}

const cleanData = (data, district, period, season) => {
  const years = [];
  const yearData = {};
  let currentYear;
  let workingData;

  data[district].forEach((data, index) => {
     const yy = data.YYYY;
     const month = Number(data.MM);
  
     if (currentYear !== yy) {
         years.push(yy);
         if (workingData) {
             yearData[currentYear] = workingData;
         }
         workingData = [];
         currentYear = yy;
     }

     if (skipLogic(month, season)) {
       return;
     }

     workingData.push(calculate(data, {district, season, period}));
  });

  yearData[currentYear] = workingData;

  return {years, yearData};

};


export const Calculate = (props) => {
  const [orignalData, changeOrignalData] = useState({});
  const {district, season, period} = props.match.params;
  const [params, changeParams] = useState({
    district,
    season,
    period,
    years: []
  });

  const data = Object.keys(orignalData).length !== 0 ?
        cleanData(orignalData, params.district, params.period, params.season) : {};

  useEffect(() => {
      if (!params.years && params.years.length === 0 && orignalData && orignalData.years) {
        //changeYear(yr => [...yr, orignalData.years[0], orignalData.years[1]]);
        /*changeParams(params => {
          params.years = [data.years[0]];
          return {...params};
        })*/
      }
  }, [orignalData, period, district, season]);


  console.log(params.season);
  console.log(params.period);
  console.log(params.district);

  const noData = () => {
    return  <div className="tb">
        <div className="tr">
            <div className="td">
                  <div className={classes.wrapper} >
                    <div className={classes.tinyWrapper} >
                      <NoData district={district}  changeData={changeOrignalData} />
                    </div>
                </div>
            </div>
          </div>
      </div>
  }

  const withData = () => {
      return  <Screen>
            <div className={classes.wrapperFull} >
              <Visual  data={data.yearData} years={params.years}   />
            </div>
            
            <div className={classes.wrapperFull} >
              {params.years.map(
                (yr, index) => {
                  return <Summary key={index}  data={data.yearData[yr]} changeData={changeOrignalData} />
                }
              )}
            </div>
          </Screen>
  }


  return <div >
      <Toolbar parameter={params} setValue={changeParams} years={data.years} />
      <div className={classes.maxWrapper } >
        {data && data.years ? withData() : noData()}
    </div>
  </div>
      
     
};