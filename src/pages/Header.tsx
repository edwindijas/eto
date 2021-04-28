import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from 'colors';
import { Dropdown } from 'components/DropDown';
import { Select } from 'components/Select';
import { IconAllWeather } from 'Icons/AllWeather';
import { IconSun } from 'Icons/Sun';
import { IconWet } from 'Icons/Wet';
import { getAllYears, getDistricts } from './GetData';
import { ContextProvider, iContextProps } from './DataProvider';
import { device } from 'device';


export const Header = () => {

    const [years, setYears] = useState<string[]>([]);
    const districts = getDistricts();
    const context = useContext(ContextProvider);

    useEffect(() => {
        const {district} = context;
        if (!district) {
            return;
        }

        const years = getAllYears(district);
        const yearsArr: string[] = [];
        for(let x = years.first; x <= years.last; x++) {
            yearsArr.push(x.toString());
        }

        setYears(yearsArr);

    }, [context, setYears]);

    return <MainEle >
        
        <Wrapper >
            <TopLogo >
                ETO<span>Visualiser</span>
            </TopLogo>
            <ControlsGroup >
                <Control >
                    <ControlLabel >District</ControlLabel>
                    <ControlWrapper >
                        <Dropdown { ...dropDownStyle } 
                        options = {districts} 
                        default = {context.district}
                        onChange = {changeSwitch(context, 'district')} />
                    </ControlWrapper>
                </Control>
                <Control >
                    <ControlLabel >Year</ControlLabel>
                    <ControlWrapper >
                        <Dropdown 
                            {...dropDownStyle} 
                            options = {years}
                            multiple = { true }
                            default = { context.years }
                            onChange = {changeSwitch(context, 'years')}
                        />
                    </ControlWrapper>
                </Control>
            </ControlsGroup>
            <ControlsGroup >
                <Control className='previewControl' >
                        <ControlLabel >Preview</ControlLabel>
                        <ControlWrapper >
                            <Select
                                options = { periodOptions }
                                default = { context.preview }
                                onChange = {changeSwitch(context, 'preview')}
                            />
                        </ControlWrapper>
                    </Control>
                    <Control className='periodControl' >
                        <ControlLabel >Season</ControlLabel>
                        <ControlWrapper >
                            <Select
                                options = { options }
                                default = { context.season }
                                onChange = {changeSwitch(context, 'period')}
                            />
                        </ControlWrapper>
                    </Control>
            </ControlsGroup>
        </Wrapper>
    </MainEle>
};


const changeSwitch  = (context: iContextProps, name: string) => {
    return (value: string | string[] | undefined) => {
        if (!value) {
            return;
        }
        context.changeItem(name, value);
    }
}

const dropDownStyle = {
    background: 'none',
    buttonBackground: 'none',
    iconColor: '#000'
}

const MainEle = styled.header`
    height: 5em;
    background-color:  #fff;//${ colors.strong };
    width: 100%;
    font-size: 0.8em;
    color: ${colors.text};
    position: relative;
    z-index: 10000;
    @media  ${ device.laptop.max }{
        height: 10em;
    }

    @media ${ device.mobileL.max } {
        height: 15em;
    }
`;


const TopLogo = styled.div `
    position: absolute;
    font-size: 2em;
    left: 0em;
    span {
        display: block;
        font-size: 0.5em;
    }
    top: 0;
    bottom: 0;
    margin: auto 0;
    height: 1.5em;
    @media ${ device.tablet.max } {
        bottom: 2.5em;
    }

    @media ${ device.mobileL.max } {
        bottom: 5em;
    }
`


const ControlsGroup = styled.div`
    margin-left: 16em;
    position: relative;
    &:nth-child(3) {
        position: absolute;
        right: 0;
        top: 0;
    }

    @media ${ device.tablet.max } {
        &:nth-child(2) { 
            
        }
    }

    @media ${  device.laptop.max } {
        margin-left: 0;
        &:nth-child(3) {
            right: 0;
            bottom: 0;
            height: 5em;
            top: auto;
            left: 0;
            width: 100%;
        }

        &:nth-child(2) { 
            right: 0;
            position: absolute;
            z-index: 10000;
        }
    }

    @media ${  device.mobileL.max }{ 
        &:nth-child(3) { 
            height: 10em;
        }
    }
   

`;

const Control = styled.div`
    position: relative;
    white-space: nowrap;
    padding: 1em 1em;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    display: inline-block;
    vertical-align: top;
    @media ${ device.tablet.max } {
        padding: 1em 0.75em;
    }

    @media ${  device.laptop.max }{
        &.previewControl, &.periodControl {
            position: absolute;
            left: 0;
            padding: 1em 0;
            width: max-content;
            margin: 0;
            bottom: 0;
            height: 5em;
        }

        &.periodControl {
            left: auto;
            right: 0;
        }
    }

    @media ${  device.mobileL.max }{
        &.previewControl, &.periodControl {
            left: 0;
            right: auto;
        }
        &.previewControl {
            left: 0;
            right: auto;
            bottom: 1em;
            top: auto;
        }
    }
`;

const ControlLabel = styled.span`
    display: block;
    height: 0;
    line-height: 3em;
    font-weight: bold;
    @media ${ device.tablet.max } {
        display: none;
    }
`;

const ControlWrapper = styled.div`
    display: block;
    margin-left: 5em;
    min-width: 8em;
    @media ${ device.tablet.max } {
        margin: 0;
        white-space: nowrap;
    }
`;

const Wrapper = styled.div`
    margin: 0 2.5%;
    position: relative;
    height: 100%;
`;


const options = [
    {
        label: 'all',
        icon: IconAllWeather
    },
    {
        label: 'dry',
        icon: IconSun
    },
    {
        label: 'wet',
        icon: IconWet
    }
]

const periodOptions = [
    {
        label: 'graph'
    },
    {
        label: 'table'
    }
]