/*var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var sensor = require('node-dht-sensor');

client.on('connect', function () {

sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
      client.publish('test', temperature.toFixed(1))
      client.end()
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
})
});*/

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var sensor = require('node-dht-sensor');
var temp;
var hum;

sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
        temp = (temperature.toFixed(1));
        hum = (humidity.toFixed(1));
    }
});

client.on('connect', function () {
  client.subscribe('test', function (err) {
    if (!err) {
      client.publish('test', this.temp)
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
