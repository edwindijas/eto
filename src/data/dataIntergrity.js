//Walks through data and notifies us the given data is Off
const fs = require('fs');
const path = require("path");

const Chikwawa = require("./Chikwawa-Fixed.json");
const Ntcheu = require("./Ntcheu-Fixed.json");
const Salima = require("./Salima-Fixed.json");

const data = {Chikwawa, Salima, Ntcheu};

const saveFile = (data, name) => {
    fs.writeFileSync(path.join(__dirname, `${name}-Fixed.json`), JSON.stringify(data));
};


Object.keys(data).forEach(key => {
    console.log('\x1b[36m%s\x1b[0m',`Showing results for ${key}`);
    workOnData(data[key]);
    //saveFile(data[key], key);
});

function workOnData(data) {
    let dd = 0;
    let mm = 1;
    let yy = 1990;
    const errors = [];
    for (let x = 0; x < data.length; x++) {
        const nextDate = getNextDate(dd, mm, yy);
        dd = nextDate.DD;
        yy = nextDate.YY;
        mm = nextDate.MM;
        let {DD, YYYY, MM} = data[x];

        //Remove Reap Year

        /*if (DD === 29 && MM === 2) {
            data.splice(x, 1);
            continue;
        }

        if (DD === 31 && MM === 12 && YYYY - 1 === nextDate.YY) {
            YYYY -= 1;
            data[x].YYYY = YYYY;
        }*/


        if (DD === nextDate.DD && YYYY == nextDate.YY && MM === nextDate.MM) {
            continue;
        }

        const prev = data[x - 1];
        console.log('\x1b[41m%s\x1b[0m', ` Previous = ${prev.DD}-${prev.MM}-${prev.YYYY} expected ${nextDate.DD}-${nextDate.MM}-${nextDate.YY} got ${DD}-${MM}-${YYYY} `);
        return;
    }
}

function getNextDate (DD, MM, YY) {
    //console.log(DD, monthEnd(MM, YY));

    
    if (DD === monthEnd(MM, YY) && MM === 12) {
        MM = 1;
        DD = 1;
        YY += 1;
    } else if (DD === monthEnd(MM, YY)) {
        DD = 1;
        MM += 1;
    } else {
        DD += 1;
    }

    return {DD, MM, YY};
}

function monthEnd (MM, YY) {
    const monthEnds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return monthEnds[MM -1];

}

function isReapYear (year) {
    if (year % 4 !== 0) {
        return false;
    }

    if (year % 100 === 0 && year % 400 !== 0) {
        return false;
    }

    return true;
}
