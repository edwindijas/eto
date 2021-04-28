import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { colors } from 'colors';
import { IconDropDown } from 'Icons/DropDown';

export const getInputValue = (defaultValue: string | undefined = undefined): onChange["onChange"] => {
  let currentValue : string | string[] | undefined = defaultValue;
  return (value: string | string[] | undefined): any => {
    return value = currentValue === undefined ? value : currentValue;
  }
}

export const Dropdown = (props: iProps) => {
  const def = props.multiple ? [] : '';
  const [active, setActive] = useState<boolean>(false);
  const [mainValue, setValue] = useState<string | string[]>(props.default || def);
  
  useEffect(() => {
    if (props.default) {
      setValue(props.default);
    }
  }, [props]);

  const ref = useRef<HTMLUListElement>(null);
  const changeActiveStateHandler = changeActiveState(setActive, ref);

  return <RootEle background = {props.background} >
      <MainEle  >
        <LabelEle >{ Array.isArray(mainValue) && mainValue.length > 1 ? `${mainValue[0]} ...` : mainValue }</LabelEle>
        <DropButton 
          buttonBackground = {props.buttonBackground}
          iconColor = { props.iconColor } 
          onClick = {changeActiveStateHandler} >
          <IconDropDown />
        </DropButton>
      </MainEle>
      <SecondaryOptions state = { active } ref = { ref } >
          {props.options && props.options.map(
            (value: string, index: number) => <OptionEle
              key= {index} 
              active = { Array.isArray(mainValue) ? mainValue.indexOf(value) > -1 : value === mainValue } >
                <button 
                  onClick = { changeOption(setValue, value.toString(), changeActiveStateHandler, props.onChange )}
                      >{ value }</button>
            </OptionEle>
          )}
      </SecondaryOptions>
  </RootEle>
}


const changeOption = (setValue: React.Dispatch<SetStateAction<string | string[]>>,
    value: string, changeActiveStateHandler: (() => void),
    action?: ((value: string | string[]) => void) | undefined
) => {
  return  () => {
     setValue((oldValue: string | string[]) => {
        const index = Array.isArray(oldValue) ? oldValue.indexOf(value) : 0;
        if (typeof oldValue === 'string') {
          if (action) {
            action(value);
          }
          return value;
        } 

        let newArr = [...oldValue];

        if (Array.isArray(oldValue) && index > -1) {
            newArr.splice(index, 1);
        } else if (Array.isArray(oldValue)) {
           newArr.push(value)
            
        }

        if (action) {
          action(newArr);
        }

        return oldValue;
     }); 
     //changeActiveStateHandler();
     if (action) {
       action(value);
     }

  }
}

const changeActiveState = (setState: React.Dispatch<SetStateAction<boolean>>,
    ref: React.MutableRefObject<HTMLUListElement | null>
  ) => {

  const deactivate = (e: MouseEvent) => {
    const {target} = e;
    if (ref.current === null || !target) {
      return;
    }

    if (ref.current.contains(target as Element)) {
      return;
    }

    setState(false);

    removeEventListener();
    e.preventDefault();
    e.stopPropagation();

    if (e.stopImmediatePropagation) {
      e.stopImmediatePropagation();
    }

   return;
  }

  const removeEventListener = () => {
    window.removeEventListener('click', deactivate, true);
  }

  const activate = () => {
    window.addEventListener('click', deactivate, true);
    return;
  }

  return () => {
    setState((currentState: boolean) => {
        if (!currentState) {
          activate();
        } else {
          //To do Fix bug
          removeEventListener();
        }
        return !currentState;
    })

  }
}

export interface onChange {
  onChange?: ((value?: string | string[] | undefined) => string | string[] | void)
}


interface iProps extends onChange {
  background?: string;
  buttonBackground?: string;
  color?: string;
  default?: string | string[];
  listBackground?: string;
  iconColor?: string;
  options?: string[];
  multiple?: boolean
}


interface iState {
  state: boolean;
  listBackground?: string;
}

interface iOptions {
  background?: string;
  active?: boolean
}


const MainEle = styled.div`
    position: relative;
`;

const RootEle = styled.div`
  position: relative;
  height: 3em;
  width: 100%;
  background: ${(props: iProps) => props.background || colors.background};
  border-radius: 0.25em;
`;

const DropButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  width: 3em;
  height: 3em;
  background: ${ (props: iProps) => props.buttonBackground || colors.text };
  border: 0;
  font-size: 1em;
  fill: ${ (props: iProps) => props.iconColor || '#fff' };
  padding: 1em;
  line-height: 0;
  border-radius: 0 0.75em 0.75em 0;
`;

const SecondaryOptions = styled.ul`
  position: absolute;
  top: 120%;
  width: 100%;
  max-height: 80vh;
  overflow: auto;
  background-color: ${ (props: iState) => props.listBackground || '#fff' };
  border-radius: 1em;
  box-shadow: 0 0 10px -2px #888;
  display: ${ (props: iState) => props.state ? 'block' : 'none' };
`;

const OptionEle = styled.li`
  display: block;
  //border-bottom: 0.05em solid ${(props: iOptions) => props.background || colors.background};
  transition: background 0.4s, color 0.4s;
  &:first-child {
    border-radius: 1em 1em 0 0;
  }

  &:last-child {
    border-bottom: 0;
    border-radius: 0 0 1em 1em;
  }

  button {
    padding: 1em 1.5em;
    color: ${ colors.text };
    display: block;
    width: 100%;
    background: none;
    text-align: left;
    text-transform: capitalize;
  }

  &:hover {
    background-color: ${ (props: iOptions) => props.active ? colors.primary : '#d2dbef' };; // ${colors.text};
    button {
      color:  ${ (props: iOptions) => props.active ? '#fff' : colors.strong };
    }
  }

  ${ ((props: iOptions) => {
    if (!props.active) {
      return '';
    }
    return `
      background-color: ${colors.primary};
      button {
        color: #fff;
      }
    `;

  })}

  
`;

const LabelEle = styled.div`
  line-height: 3em;
  padding: 0 1em;
  text-transform: cpaitalize;
`;