import { createContext } from 'react';

export const defaultProps: iContextProps = {
    district: 'chikwawa',
    season: 'all',
    preview: 'graph',
    years: [],
    theme: 'light',
    month: 'all',
    changeItem (name: string, value: string | number[] | string[]) {

    }
}

export const ContextProvider = createContext(defaultProps);

export interface iContextProps {
    district: string | undefined;
    season: string | undefined;
    preview: string | undefined;
    years: string[];
    month: string;
    theme: string;
    changeItem: (name: string, value: string | string[]) => void;
}
