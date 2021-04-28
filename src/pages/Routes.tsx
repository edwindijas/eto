import React, { useState } from 'react';
import  { BrowserRouter, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import { ContextProvider, defaultProps, iContextProps } from './DataProvider';

export const App = () => {

    const [state, changeState] = useState({
        ...defaultProps,
        changeItem (name: string, value: string | string[]) {
            changeState((currentState: iContextProps) => {
                const newState = {...currentState};
                switch(name) {
                    case 'district': 
                    case 'season': 
                    case 'preview':
                    case 'theme':
                    case 'month':
                        if (typeof value === 'string') {
                            newState[name] = value;
                        }
                        break;
                    case 'years':
                        if (Array.isArray(value)) {
                            newState[name] = value;
                        }
                        break;
                    default:
                        return currentState;
                }
                return newState;
            })
        }
    })

    return <ContextProvider.Provider value = {state} >
        <BrowserRouter >
            <Route path='/' exact={true} component={ Home } />
        </BrowserRouter>;
    </ContextProvider.Provider>
}