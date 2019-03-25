var mqtt = require('mqtt');
var sensor = require('node-dht-sensor');
var temp;
var hum;
var mqtt = require('mqtt');

var MQTT_TOPIC          = "hello";
var MQTT_ADDR           = "mqtt://test.mosquitto.org";
var MQTT_PORT           = 1883;

/* This is not working as expected */
//var client = mqtt.connect({host: MQTT_ADDR, port:MQTT_PORT},{clientId: 'bgtestnodejs'});

/* This works... */
var client  = mqtt.connect(MQTT_ADDR,{clientId: 'bgtestnodejs', protocolId: 'MQIsdp', protocolVersion: 3, connectTimeout:1000, debug:true});

function run(){
  sensor.read(11, 4, function(err, temperature, humidity) {
      if (!err) {
          console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
              'humidity: ' + humidity.toFixed(1) + '%'
          );
          temp = (temperature.toFixed(1));
          hum = (humidity.toFixed(1));

          console.log(temp);
          console.log(hum);
          console.log("Exiting Sensor.read");

          callMQTT(temp, hum);

      }
      else {
        console.log(err);
      }
  });
};

function callMQTT(temp, hum){
  client.on('connect', function () {
    client.subscribe('presence', function (err) {
      if (!err) {
        client.publish('presence', temp);
      }
    })
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
  })
}


// client.on('connect', function () {
//   console.log("Entering Connect");
//   run();
//     client.subscribe(MQTT_TOPIC);
//     client.publish(MQTT_TOPIC, temp);
//     console.log("Exiting Connect");
// });
//
// client.on('message', function (topic, message) {
//   console.log("Entering message");
//     // message is Buffer
//     console.log(message.toString());
//     console.log("Exiting message");
//     client.end();
// });
//
// client.on('error', function(){
//   console.log("Entering error");
//     console.log("ERROR")
//     console.log("Exiting error");
//     client.end()
// });
