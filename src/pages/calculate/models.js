export const tempMean = (min, max)  => (min + max) / 2;

const p = 0.274;
const z = 482;
const l = 14;

const tDev = (Tmean, rh) => {
    return Tmean - ((100 - rh) / 5);
}

const salima = {
    daily: {
        wet (min, max, rHum) {
            const tMean = tempMean(min, max);
            return (0.833 * ((((700 * (tMean + (0.006 * z))) / (100 - l) ) + (15 *(tMean - tDev(tMean, rHum) ))) / (80 - tMean))) - 0.7089;
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
            return (0.9847 * 0.34 * p * Math.pow(tMean, 1.3) ) - 0.0386;
        }
    },
    monthly: {
        wet (min, max, rHum) {
            const tMean = tempMean(min, max);
            return ((((700 * (tMean + (0.006 * z))) / (100 - l) ) + (15 * (tMean - tDev(tMean, rHum) ))) / (80 - tMean)) + 0.6757;
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 0.9968;
        }
    }
};

const ntcheu = {
    daily: {
        wet (min, max) {
            const tMean = tempMean(min, max);
            return 0.8172 * 0.34 * p * Math.pow(tMean, 1.3);
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
            return (0.9847 * 0.34 * p * Math.pow(tMean, 1.3)) - 0.0386;
        }
    },
    monthly: {
        wet (min, max) {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 0.8132;
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 0.8399;
        }
    }
};

const chikwawa = {
    daily: {
        wet (min, max) {
            const tMean = tempMean(min, max);
            return 0.6989 *(0.34 * p * Math.pow(tMean, 1.3));
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
            return (1.0786 * (0.34 * p * Math.pow(tMean, 1.3))) - 0.2268;
        }
    },
    monthly: {
        wet (min, max) {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 0.7107;
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
            return (0.34 * p * Math.pow(tMean, 1.3)) + 1.0627;
        }
    }
};


export const Models = {
    salima, ntcheu, chikwawa
}

export const calculate = (cardDetails, {district, season, period}) => {
    const tMin = Number(cardDetails.tMin || cardDetails.TMIN);
    const tMax = Number(cardDetails.tMax || cardDetails.TMAX);
    const yy = Number(cardDetails.YYYY);
    const mm = Number(cardDetails.MM);
    const dd = Number(cardDetails.DD);
    const rHum = Number(cardDetails.RHUM);
    const date = `${dd}/${mm}/${yy}`
    const tMean = (tMin + tMax) / 2;
    //const eto = (0.34 * 0.274 * (Math.pow(tMean, 1.3)) ) + 0.9868;
    const eto = Models[district][period][season](tMin, tMax, rHum);

    return {
        tMin,
        tMax,
        date,
        tMean,
        mm,
        yy,
        dd,
        eto
    }
}