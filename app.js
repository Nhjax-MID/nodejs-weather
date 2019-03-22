var dht = require('dht-sensor');
var current = dht.read(11, 04); // 11 : DHT11, 18 : BCM GPIO

console.log(current.humidity);
console.log(current.temperature);
