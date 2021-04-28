const months = [
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"
]

const getMonthIndex = (year, month) => {
    let startIndex = 0;
    if (typeof month === 'string') {
        month = months.indexOf(month);
    }

    
    if (month > 1) {
        startIndex -= isReapYear(year) ? 1 : 2;
    }

    const lowMonths = month > 7 ? 7 : month;
    const highMonths = month - lowMonths;

    startIndex += Math.ceil(lowMonths / 2 ) * 31;
    startIndex += Math.floor(lowMonths / 2 ) * 30;



    startIndex += Math.ceil(highMonths / 2 ) * 31;
    startIndex += Math.floor(highMonths / 2 ) * 30;


    return startIndex;
}

const isReapYear = (year) => {
    if (year % 4 !== 0) {
        return false;
    }

    if (year % 100 === 0 && year % 400 !== 0) {
        return false;
    }

    return true;
}


const testCases = [[2020, 0, 0],
[2019, 1, 31],
[2020, 2, 60],
[2019, 2, 59],
[2020, 3, 91],
[2020, 4, 121],
[2020, 5, 152],
[2020, 6, 182],
[2020, 7, 213],
[2020, 8, 244],
[2020, 9, 274],
[2020, 10, 305],
[2020, 11, 335],
[2019, 11, 334]];


const assert = (condition, message, message2) => {
    if (!condition) {
        console.log('\x1b[41m%s\x1b[0m', message);
    } else {
        console.log('\x1b[36m%s\x1b[0m', message2);
    }
}
testCases.forEach((value) => {
    const days = getMonthIndex(value[0], value[1]);
    assert(days === value[2],
         `The month ${months[value[1]]}(${value[1]}) of ${value[0]} doesn't match expected ${value[2]} algo gave ${days}`,
         `The month ${months[value[1]]} of ${value[0]} matches ${value[2]} algo gave ${days}`,
         );
});

