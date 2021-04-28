import React from 'react'
import styled from 'styled-components'
import { months } from 'Months';
import { colors } from 'colors';
import { iGraphPreview } from './GraphPreview'
import { iDataProps } from './GetData';

export const DataTableView = (props: iGraphPreview ) => {
    //console.log(props.data && Object.keys(props.data));
    return  <div >{ props.data && Object.keys(props.data).map(
        (year: string, index: number) => table(year, index, props.data && props.data[year])
    )}</div>
}


const table = (year: string, index: number, data: iDataProps[] | undefined) => {
    return <MainEle key = {index}>
        <TitleEle >{ year }</TitleEle>
        <WrapperEle >
            <MonthEle >
                <ValueEle>Days</ValueEle>
                {Array(31).fill(0).map(
                    (value: number, index: number) => <ValueEle key = {index} > { index + 1 } </ValueEle>
                )}
            </MonthEle>
            { data && monthTable(data) }
        </WrapperEle>
        
    </MainEle>
}


const monthTable = (data: iDataProps[]) => {


    const items: React.ReactElement[] = [];
    let children: React.ReactElement[] = [];

    const pushChildren = (month: number) => {
        items.push(
            <MonthEle key = {items.length} >
                <ValueEle > { months[month - 1] } </ValueEle>
                { children }
                { Array(31 - children.length).fill(0).map(
                    (value, index) => {
                        return <ValueEle key = {index} >Null</ValueEle>
                    }
                ) }
            </MonthEle>
        )

        children = [];
    }

    

    for (let x = 0; x < data.length; x++ ) {
        children.push(
            <ValueEle key = {x} >{ data[x].ETO && data[x].ETO?.toFixed(2) }</ValueEle>
        )
        if (x === data.length - 1 || data[x + 1].MM !== data[x].MM) {
            pushChildren(data[data.length - 1].MM);
        }
    }


    return items;
}


const MainEle = styled.div`
    margin: 1em auto;
    background-color: #fff;
    padding: 2em;
    width: 90%;
    border-radius: 1em;
`;

const WrapperEle = styled.div`
    overflow: auto;
    white-space: nowrap;
    position: relative;
`;


const ValueEle = styled.div`
    display: block;
    vertical-align: top;
    padding: 0.5em 1em;
    text-transform: capitalize;
    //text-align: right;
    &:nth-child(even) {
        background-color: ${colors.background};
    }

    &:first-child {
        font-weight: bold;
        text-align: left;
    }
`;

const MonthEle = styled.div`
    display: inline-block;
    vertical-align: top;
    text-transform: capitalize;
    position: relative;
    width: calc((100% - 4em) /12);
    &:first-child {
        width: 4em;
        font-weight: bold;
    }
`;


const TitleEle = styled.div`
    font-size: 4em;
    padding-bottom: 0.5em;
`
