const devices = {
    mobile: 320,
    mobileM: 375,
    mobileL: 520,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560
};

export const device: iALL = {
    mobile: {
        min: `(min-width: ${devices.mobile}px)`,
        max: `(max-width: ${devices.mobile}px)`
    },
    mobileM: {
        min: `(min-width: ${devices.mobileM}px)`,
        max: `(max-width: ${devices.mobileM}px)`
    },
    mobileL: {
        min: `(min-width: ${devices.mobileL}px)`,
        max: `(max-width: ${devices.mobileL}px)`
    },
    tablet: {
        min: `(min-width: ${devices.tablet}px)`,
        max: `(max-width: ${devices.tablet}px)`
    },
    laptop: {
        min: `(min-width: ${devices.laptop}px)`,
        max: `(max-width: ${devices.laptop}px)`
    },
    laptopL: {
        min: `(min-width: ${devices.laptopL}px)`,
        max: `(max-width: ${devices.laptopL}px)`
    },
    desktop: {
        min: `(min-width: ${devices.desktop}px)`,
        max: `(max-width: ${devices.desktop}px)`
    }
};


export const combine = (queryOne: string, queryTwo: string) => {
    const combinedQuery = queryOne.substr(0, queryOne.length - 1) + ' and ' + queryTwo.substr(1);
    return combinedQuery;
}

interface IDevice {
    min: string;
    max: string;
}

interface iALL {
    [key: string]: IDevice
}