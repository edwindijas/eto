
export const colors1: {[key: string]: string} = {
    primary: '#1dbfc1', 
    highlight: '#209dff', 
    secondary: '#ff8919', 
    strong: '#404d71', 
    text: '#8293b9'
}

export const colors: {[key: string]: string} = {
    ...colors1, 
    background: '#f2f7ff', 
    warning: '#fc696a', 
}

export const getAllColors = (): string[] => {
    return Object.keys(colors).map((color: string) => {
        return colors[color]
    });
}

export const getHighConstrastColors = (): string[] => {
    return Object.keys(colors1).map((color: string) => {
        return colors1[color];
    });
}

export const  hexColorToRGBA = (hex: string, opacity: number): string => {
    
    const hexArr = hex.split('');
    const red = hexToInt( hexArr.slice(1, 3).join(''));
    const green = hexToInt( hexArr.slice(3, 5).join(''));
    const blue = hexToInt( hexArr.slice(5, 7).join(''));
    if (opacity > 1) {
        opacity = opacity / 100; 
    }

    const rgbColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;

    return rgbColor;
}

const hexToInt = (hex: string) => {
    return parseInt(`0x${hex}`, 16);
}