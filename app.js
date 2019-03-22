var es = require('event-stream');
var fs = require('fs');
var parser = require('weather-alerts-parser');
var request = require('request');
var sensor = require('node-dht-sensor');
var axios = require('axios');

sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
});

axios.get('http://alerts.weather.gov/cap/us.php?x=0')
.then((response) => {
  console.log(response.data);
})
.catch(err => {
  console.log(err.response);
});