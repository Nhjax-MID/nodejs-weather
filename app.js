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
        this.temp = (temperature.toFixed(1));
        this.hum = (humidity.toFixed(1));

    }
});

client.on('connect', function () {
  console.log('connect', this.temp);
  client.subscribe('test', function (err) {
    if (!err) {
      console.log('test', this.temp);
      client.publish('test', this.temp)
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('connect', this.temp);
  console.log(message.toString())
  client.end()
})
