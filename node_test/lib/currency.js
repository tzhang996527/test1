const canadianDollar = 0.91;

function roundTwo(amount){
    return Math.round(amount * 100) / 100;
}

//exports object
exports.canadianToUS = canadian => roundTwo(canadian * canadianDollar);
exports.USToCanadian = us => roundTwo(us / canadianDollar);