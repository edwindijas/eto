import React, { useContext } from 'react';
import styled from 'styled-components';
import { colors } from 'colors';
import { Dropdown, getInputValue, onChange } from 'components/DropDown'
import { getDistricts } from './GetData';
import { ContextProvider, iContextProps } from './DataProvider';


export const Overlay = () => {
    const districts = getDistricts();
    const getDistrict: onChange["onChange"] = getInputValue();
    const context = useContext(ContextProvider);
    return <MainEle >
        <WrapperEle >
            <TitleEle >
                ETo
                <span >Calculator</span>
            </TitleEle>
            <SubTitleEle >This tool helps you analyse ETo of specified districts in Malawi.</SubTitleEle>
            <SubTitleEle >To continue Select <span >district</span></SubTitleEle>
            <MicroEleWrapper >
                <Dropdown options = { districts } onChange = { getDistrict } ></Dropdown>
            </MicroEleWrapper>
            <MicroEleWrapper >
                <ButtonEle onClick= { changeCurrentDistrict(context, getDistrict) } >Continue</ButtonEle>
            </MicroEleWrapper>
        </WrapperEle>
    </MainEle>
}


const changeCurrentDistrict = function (context: iContextProps, getDistrict: onChange["onChange"] ) {
    return function () {
        if (!getDistrict) {
            return;
        }
        const district = getDistrict();
        if (typeof district === 'string') { 
            context.changeItem('district', district);
        }
        
    }
}

const MainEle = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(242, 247, 255, 0.75);
    z-index: 99999;
`;


const WrapperEle = styled.div`
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 90%;
    height: max-content;
    max-height: 80%;
    margin: auto;
    max-width: 360px;
    border-radius: 1em;
    padding: 2em;
    box-shadow: 0 0 1em -0.74em #000;
`;

const ButtonEle = styled.button`
    width: 100%;
    height: 3em;
    border: 0;
    background-color: ${ colors.primary };
    color: #fff;
    border-radius: 0.5em;
`;

const TitleEle = styled.div`
    font-weight: bold;
    color: ${ colors.strong };
    font-size: 1.4em;

    span {
        display: block;
        color: ${colors.text};
        font-weight: normal;
    }
`;

const SubTitleEle = styled.p`
    padding: 1em 0 0;
    span {
        font-weight: bold;
    }
`;


const MicroEleWrapper = styled.div`
    padding: 1em 0;
`