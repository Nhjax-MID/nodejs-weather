var mqtt = require('mqtt')
var client = require('mqtt');
var sensor = require('node-dht-sensor');
var temp;
var hum;
var MQTT_TOPIC = "test";
var MQTT_ADDR = "mqtt://test.mosquitto.org";
var MQTT_PORT = 1883;
var client  = mqtt.connect(MQTT_ADDR,{
  clientId: 'bgtestnodejs',
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  connectTimeout:1000,
  debug:true
});

sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
        temp = (temperature.toFixed(1));
        hum = (humidity.toFixed(1));

        console.log(temp);
        console.log(hum);
        console.log("Entering client on");
        clientOn();

    }
    else {
      console.log(err);
    }
});

clientOnError = () => {
  client.on('error', function(){
      console.log("ERROR")
      client.end()
  });
};

clientOnPublisher = () => {
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log("Inside of message");
    console.log('connect', topic, message);
    console.log(message.toString());
    client.end();
  });
};

clientOn = () => {
  client.on('connect', function () {
    console.log("Inside of client on");
    console.log('connect', temp);
  client.subscribe(MQTT_TOPIC, function (err) {
    if (!err) {
      client.publish(MQTT_TOPIC, temp)
    }
    else {
      console.log("Theres an error inside of subscribe");
      client.end();
    }
  });
});

// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString());
//   client.end();
// });

// console.log('foo');
//   client.on('connect', function () {
//     console.log("Inside of client on");
//     console.log('connect', temp);
//     client.subscribe('test', function (err) {
//       if (!err) {
//         console.log("Inside of subscribe");
//         console.log('test', temp);
//         client.publish('test', temp);
//       }
//       else{
//       console.log(err);
// }
//     });
//
//   });
};

/* This is not working as expected */
//var client = mqtt.connect({host: MQTT_ADDR, port:MQTT_PORT},{clientId: 'bgtestnodejs'});

/* This works... */
