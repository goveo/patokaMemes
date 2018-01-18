let stringRegexp = /^[a-zA-Z0-9_]{3,}$/
let isoDateRegexp = /\d{4}-(0[1-9]|1[0-2])\-(0[1-9]|1[0-9]|2[0-9]|3[0-1])/;
let numberRegexp = /^[+]?\d+([.]\d+)?$/;
function checkString(str){
    return stringRegexp.test(str);
}

function checkDate(str){
    return isoDateRegexp.test(str);
}

function checkNumber(str){
    return numberRegexp.test(str);
}

module.exports = {
    checkDate: checkDate,
    checkNumber: checkNumber,
    checkString: checkString
}