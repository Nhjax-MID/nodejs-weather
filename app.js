var es = require('event-stream');
var fs = require('fs');
var parser = require('weather-alerts-parser');
var request = require('request');
var sensor = require('node-dht-sensor');

sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
});
