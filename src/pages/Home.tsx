import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContextProvider, iContextProps } from './DataProvider';
import { DataTableView } from './DataTableView';
import { GraphView } from './GraphPreview';
import { Header } from './Header';
import { Overlay } from './Overlay';
import { getYearData, getAllYears, iDataProps, calculate } from './GetData';
import { Select, SelectOption } from 'components/Select';
import { months } from 'Months';
import { ucFirst } from 'goodAlgorithms';
import { device } from 'device';


export const Home = () => {

    const properties = useContext(ContextProvider);
    const [data, setData] = useState<{[key: number]: Array<iDataProps>}>();
    const [title, setTitle] = useState<string>('');
    useEffect( () => {

        if (properties.district === undefined) {
            return;
        }

        const district = properties.district;

        if (properties.years.length === 0) {
            const {first, last} = getAllYears(properties.district);
            properties.changeItem('years', [first.toString(), last.toString()]);
            return;
        }

        //Generate Data
        const data: {[key: string]: Array<iDataProps>} = {};
        

        properties.years.forEach(year => {
            const intData = getYearData(district, parseInt(year));
            if (properties.month !== 'all') {
                let start = 0;
                let end = intData.length;
                start = getMonthIndex(parseInt(year), properties.month);
                end = start + daysOfMonth(parseInt(year), properties.month);
                data[year] = intData.slice(start, end);
            } else if (properties.district && properties.preview === 'graph') {
                data[year] = monthlyData(intData, properties.district);
            } else {
                data[year] = intData;
            }
        });
        
        setData(data);
        setTitle(`${ucFirst(properties.district)} ETO for ${properties.month} months`);

    }, [properties, setData])


    return <div >
       
        <Header />
        <MainEle >
            { !properties.district && <Overlay /> }
            <Select options = { monthsSelectacble } fit = {true} onChange = {chooseMonth(properties)} />
            { properties.preview === 'graph' ? <GraphicsEle >
                <GraphView data = {data} title = { title } monthlyLabel = {properties.month === 'all'} />
                </GraphicsEle> :
                <DataTableView data = {data}  monthlyLabel = {properties.month === 'all'} />
            }
        </MainEle>
    </div>
};


const monthlyData = (data: iDataProps[], district: string): iDataProps[] => {
    let tMinSum = 0,
        tMaxSum = 0,
        count = 0,
        month = 1;
    const finalData: iDataProps[] = [];
    const pushVal = (data: iDataProps, force: boolean = false) => {
        if (month === data.MM  && !force) {
            return;
        }
        const   TMIN = tMinSum / count,
        TMAX = tMaxSum / count;

        finalData.push(calculate({
            ...data,
            TMAX,
            TMIN,
            MM: month,
        }, district, 'monthly'))

        month = data.MM;
    }
    for (let x = 0; x < data.length; x++) {
        pushVal(data[x]);
        tMinSum += data[x].TMIN;
        tMaxSum += data[x].TMAX;
        count++;
    }
    pushVal(data[data.length - 1], true);
    return finalData;
}

const getMonthIndex = (year: number, month: string | number): number => {
    let sum = 0;
    if (typeof month === 'string') {
        month = months.indexOf(month);
    }

    for(let x = 0; x < month; x++) {
        sum += daysOfMonth(2020, x);
    }


    return sum;
}

const daysOfMonth = (year: number, month: string | number): number => {

    if (typeof month === 'string') {
        month = months.indexOf(month);
    }

    const monthEnds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return monthEnds[month];
}


const chooseMonth = (context: iContextProps) => (value: string | string[] | undefined) => {
    if (value && typeof value === 'string') {
        context.changeItem('month', value);
        return;
    }
};

const monthsSelectacble : SelectOption[] = [{label: 'all'}, ...months.map(month => ({ label: month }))];

const MainEle = styled.div`

`;

const GraphicsEle = styled.div`
    background-color: #fff;
    margin: 1em auto;
    width: 100%;
    height: 70vh;
    border-radius: 1em;
    padding: 2em;
    position: relative;

    @media  ${ device.laptop.max } {
        padding: 2em 0;
        height: 60vh;
    }

`;

