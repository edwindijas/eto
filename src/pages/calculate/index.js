import React, {useState, useEffect} from "react";
import { Summary } from "./summary";
import classes from "./index.module.scss";
import {NoData} from "./nodata";
import {Visual} from "./visualise";
import {Screen} from "./screen";
import { Toolbar } from "./toolbar";
import {calculate} from "./models";


export const Calculate = (props) => {
  const [orignalData, changeOrignalData] = useState({});
  const [data, changeData] = useState({});
  const [year, changeYear] = useState([]);
  const {district, season, period} = props.match.params;

  useEffect(() => {
      if (year.length === 0 && orignalData && orignalData.years) {
        changeYear(yr => [...yr, orignalData.years[0], orignalData.years[1]]);
      }

      if (orignalData.years) {
        const years = [...orignalData.years];
        const yearData =  {};
        years.filter(yr => yr !== undefined).forEach((year) => {
        return orignalData.yearData[year].forEach(
          details => {
            const det = calculate(details, {district, season, period})
            if (!yearData[year]) {
              return yearData[year] = [det];
            }
            yearData[year].push(det);
          }
        )
      });

      changeData({years, yearData});
    }
  }, [orignalData, year])

  console.log(data);

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
            <Visual />
            <div className={classes.wrapperFull} >
              {year.map(
                (yr, index) => {
                  return <Summary key={index}  data={data.yearData[yr]} changeData={changeOrignalData} />
                }
              )}
            </div>
          </Screen>
  }


  return <div >
      <Toolbar years={data.years} />
      <div className={classes.maxWrapper } >
        {data && data.years ? withData() : noData()}
    </div>
  </div>
      
     
};