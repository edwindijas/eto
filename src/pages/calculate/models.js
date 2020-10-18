export const tempMean = (min, max)  => (min + max) / 2;

const p = 0.274;

const salima = {
    daily: {
        wet (min, max) {
            const tMean = tempMean(min, max);
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
            return (0.9847 * 0.34 * p * Math.pow(tMean, 1.3) ) - 0.0386;
        }
    },
    monthly: {
        wet (min, max) {
            const tMean = tempMean(min, max);
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
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
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
        }
    }
};

const chikwawa = {
    daily: {
        wet (min, max) {
            const tMean = tempMean(min, max);
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
        }
    },
    monthly: {
        wet (min, max) {
            const tMean = tempMean(min, max);
        },
        dry (min, max) {
            const tMean = tempMean(min, max);
        }
    }
};


export const Models = {
    salima, ntcheu, chikwawa
}

export const calculate = (cardDetails, {district, season, month}) => {
    const tMin = Number(cardDetails.tMin || cardDetails.TMIN);
    const tMax = Number(cardDetails.tMax || cardDetails.TMAX);
    const yy = cardDetails.YYYY;
    const mm = cardDetails.MM;
    const dd = cardDetails.DD;
    const date = `${dd}/${mm}/${yy}`
    const tMean = (tMin + tMax) / 2;
    const eto = (0.34 * 0.274 * (Math.pow(tMean, 1.3)) ) + 0.9868;

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