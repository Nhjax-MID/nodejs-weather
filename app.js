var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org');
var sensor = require('node-dht-sensor');
var temp;
var hum;

function publisher(){
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log("Inside of message");
    console.log('connect', topic, message);
    console.log(message.toString());
    client.end();
  });
}
function clientOn() {
  client.on('connect', function () {
    console.log("Inside of client on");
    console.log('connect', temp);
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('test', temp)
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

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
