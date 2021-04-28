import chikwawa from 'data/Chikwawa-Fixed.json';
import ntcheu from 'data/Ntcheu-Fixed.json';
import salima from 'data/Salima-Fixed.json';




const data: {
    [key: string]: Array<iDataProps>
} = {
    chikwawa,
    ntcheu,
    salima     
};

export const getData = (district: string) => {
    return data[district];
}


export const getDistricts = (): string[] => Object.keys(data);

export const getYearData = (district: string, year: number) => {
    const offset = ((year - 1990) * 365); // + howManyReapYears(year);
    //const yearDays = (isReapYear(year) ? 367 : 366) + offset;

    const yearData = data[district].slice(offset, 365 + offset);
    addCalculatedETO(yearData, district);
    return yearData;
}


export const isReapYear = (year: number): boolean => {
    if (year % 4 !== 0) {
        return false;
    }

    if (year % 100 === 0 && year % 400 !== 0) {
        return false;
    }

    return true;
}


const getSeason = (month: number): string => {
    if (month === 12 || month <= 4) {  
        return 'dry';
    } else if (month !== 12 && month > 4) {
        return 'wet';
    }

    return 'wet';
}


export const addCalculatedETO = (data: Array<iDataProps>, district: string) => {
    for(let x = 0; x < data.length; x++) {
        const period = 'daily';
        const {TMIN, TMAX, RHUM, MM} = data[x];
        const season = getSeason(MM);
        data[x].ETO = models[district][period][season](TMIN, TMAX, RHUM);
    }
}

export const howManyReapYears = (year: number): number => {
    return Math.floor((year - 1) / 4) - 497;
}

export const getAllYears = (district: string): {first: number, last: number} => {
    const interiorData = data[district];
    const first = interiorData[0].YYYY;
    const last = interiorData[interiorData.length - 1].YYYY;
    return {
        first,
        last
    }
}


export interface iDataProps{
    "YYYY": number;
    "MM": number;
    "DD": number;
    "SRAD": number;
    "TMAX": number;
    "TMIN": number;
    "RAIN": string;
    "WIND": number;
    "RHUM": number;
    "ETO"?: number;
}

export const tempMean = (min: number, max: number)  => (min + max) / 2;

const p = 0.274;
const z = 482;
const l = 14;

const tDev = (Tmean: number, rh: number): number => {
    return Tmean - ((100 - rh) / 5);
}

const salimaModel = {
    daily: {
        wet (min:  number, max:  number, rHum:  number): number {
            const tMean = tempMean(min, max);
            return (0.833 * ((((700 * (tMean + (0.006 * z))) / (100 - l) ) + (15 *(tMean - tDev(tMean, rHum) ))) / (80 - tMean))) - 0.7089;
        },
        dry (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return (0.9847 * 0.34 * p * Math.pow(tMean, 1.3) ) - 0.0386;
        }
    },
    monthly: {
        wet (min: number, max: number, rHum: number): number {
            const tMean = tempMean(min, max);
            return ((((700 * (tMean + (0.006 * z))) / (100 - l) ) + (15 * (tMean - tDev(tMean, rHum) ))) / (80 - tMean)) + 0.6757;
        },
        dry (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 0.9968;
        }
    }
};

const ntcheuModel = {
    daily: {
        wet (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return 0.8172 * 0.34 * p * Math.pow(tMean, 1.3);
        },
        dry (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return (0.9847 * 0.34 * p * Math.pow(tMean, 1.3)) - 0.0386;
        }
    },
    monthly: {
        wet (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 0.8132;
        },
        dry (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 0.8399;
        }
    }
};

const chikwawaModel = {
    daily: {
        wet (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return 0.6989 *(0.34 * p * Math.pow(tMean, 1.3));
        },
        dry (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return (1.0786 * (0.34 * p * Math.pow(tMean, 1.3))) - 0.2268;
        }
    },
    monthly: {
        wet (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 0.7107;
        },
        dry (min: number, max: number): number {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 1.0627;
        }
    }
};


export const models: iModel = {
    salima: salimaModel, ntcheu: ntcheuModel, chikwawa: chikwawaModel
}

export const calculate = (data: iDataProps, district: string, period: string) => {
    const season = getSeason(data.MM);
    const ETO = models[district][period][season](data.TMIN, data.TMAX, data.RHUM);
    return {
        ...data,
        ETO
    }
}

interface iModelDistrict {
    [key: string]: iModelSeason
}

interface iModel {
    [key: string]: iModelDistrict
}

interface iModelSeason {
    [key: string]: iModelFunction
}

interface iModelFunction {
    (min: number, max: number, rhum: number ) : number;
}