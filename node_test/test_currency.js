//const currency = require('./currency');

const currency = require('./lib/currency');

const Currency = require('./lib/curr_class');

const canadinaDollar = 0.91;

const currency2 = new Currency(canadinaDollar);

console.log(currency2.canadianToUS(50));

console.log(currency.canadianToUS(50));
console.log(currency.USToCanadian(10));