import { colors } from 'colors';
import { device } from 'device';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { onChange } from './DropDown';

export const Select = (props: iSelectProps) => {
    const [active, setActive] = useState<string>(props.default ? props.default : props.options[0].label);
    const [width, setWidth] = useState<number>(0);

    const wrapperEle = useRef<HTMLDivElement>(null);
    useEffect (() => {
        if (!wrapperEle.current) {
            return;
        }
        const width = wrapperEle.current.offsetWidth;
        setWidth(width / props.options.length);

    }, [props]);

    return <MainEle >
        <WrapperEle ref = {wrapperEle} >
            <BackgroundEle  hasIcon = { false } width = {width} index = { props.options.findIndex(prop => prop.label === active) }  fit = {props.fit}
                        len = { props.options.length } />
            {props.options.map(
                (opt, index) => {
                    return <OptionEle 
                        key={ index }
                        className={opt.label === active ? 'active' : ''} 
                        onClick={setActiveChoice(setActive, opt.label, props.onChange)}
                        hasIcon = {!!opt.icon}
                        fit = {props.fit}
                        len = { props.options.length }
                        >
                        {opt.icon && <OptionIcon ><opt.icon /></OptionIcon>}
                        
                        <OptionLabel  >
                            {opt.label}
                        </OptionLabel>
                    </OptionEle>
                }
            )}
        </WrapperEle>
    </MainEle>
};


const setActiveChoice = (setActive: React.Dispatch<SetStateAction<string>>, value: string, onChange: onChange["onChange"]) => {
    return () => {
        setActive(value);
        if (onChange) {
            onChange(value);
        }
    }
}

const MainEle = styled.div`
    position: relative;
    background-color: #eee;
    border-radius: 0.5em;
    overflow: auto;
`;

const OptionEle = styled.button`
    height: 3em;
    border-radius: 0;
    padding: 0 2em;
    color: ${colors.text};
    fill: ${colors.text};
    vertical-align: top;
    position: relative;
    padding-left: ${ (props: iOptionConfigurator) => props.hasIcon ? '3em': '2em' };
    cursor: pointer;
    text-align: center;
    background: none;
    min-with: 8em;

    ${( props: iOptionConfigurator) => {
        if (!props.fit) {
            return 'width: 8em;';
        }
        return `width: calc(100% / ${ props.len } );`;
    }}

    &:first-child {
        border-radius: 0.5em 0 0 0.5em;
    }
    
    &:last-child {
        border-radius: 0 0.5em 0.5em 0;
    }

    &.active {
        color: ${colors.strong};
        fill: ${colors.strong};
    }

`;

const OptionIcon = styled.div`
    position: absolute;
    top: 0;
    left: 1em;
    bottom: 0;
    width: 1.25em;
    height: 1.25em;
    margin: auto 0;
`;

const OptionLabel = styled.span`
    display: inline-block;
    vertical-align: middle;
    text-transform: capitalize;
`;

const BackgroundEle = styled.div`
    position: absolute;
    top: 0.25em;
    bottom: 0.25em;
    width: 7.5em;
    background-color: #fff;
    transition: left 0.5s;
    border-radius: 0.3em;
   

    ${ ( props: iOptionConfigurator) => {
        if (!props.fit) {
            return `width: 7.5em;
                left: ${((props.index || 0) * 8) + 0.25 }em;
            `;
        }
        return `width: calc(${props.width}px - 0.5em);
            left: calc((${props.width}px * ${props.index}) + 0.25em )};
        `;
    }}
`;

const WrapperEle = styled.div`
    margin: 0 0.25em;
    white-space: nowrap;
    @media ${ device.tablet.max } {
        width: max-content;
    }
`


export interface iSelectProps extends onChange {
    options: Array<SelectOption>,
    default?: string,
    fit?: boolean,
}

export interface SelectOption {
    label: string;
    icon?: React.JSXElementConstructor<any>
}


interface iOptionConfigurator {
    len: number;
    hasIcon: boolean;
    fit: boolean | undefined;
    index?: number;
    width?: number;
}

