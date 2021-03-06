var sensor = require('node-dht-sensor'); //little blue sensor modual
var temp; //global variable for DHT Sensors
var hum; //global variable for DHT Sensors
var mqtt = require('mqtt'); //import modual

var MQTT_TOPIC          = "jax";//sets topic
var MQTT_ADDR           = "mqtt://192.168.1.163"; //address of subscriber
var MQTT_PORT           = 1883; //common MQTT port

function WX(){

  sensor.read(11, 4, function(err, temperature, humidity) {
      if (!err) {
          console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
              'humidity: ' + humidity.toFixed(1) + '%'
          );
          temp = (temperature.toFixed(1));
          hum = (humidity.toFixed(1));


          callMQTT(temp, hum);

      }
      /*else {
            console.log("");
        console.log("DANGER WILL ROBINSON SENSOR IS ON VACATION DESTROY ROBINSON FAMILY DESTROY JUPITER ONE"); //DHT sensor not working
      }*/
  })
};

function callMQTT(temp, hum){ //wrapped MQTT message handler in function callMQTT

  var client  = mqtt.connect(MQTT_ADDR,{
    clientId: 'bgtestnodejs',
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    connectTimeout:1000,
    debug:true});

  client.on('connect', function () { //MQTT message handler "Publisher"
    client.subscribe(MQTT_TOPIC, function (err) {
      if (!err) {
        let obj = {location:MQTT_TOPIC,temp:temp,hum:hum}; //oject is assigned value
        buf = Buffer.from(JSON.stringify(obj)); //buffer is dumped into a JSON object using obj
        client.publish(MQTT_TOPIC, buf); //message is pulished to subscriber
        console.log("Message sent successfully" + buf);
        client.end()
      }
    })
  })

  client.on('error', function(){ //Error handler
    console.log("");
      console.log("DANGER WILL ROBINSON ERROR ERROR MESSAGE HANDLER FAILED DESTROY ROBINSON FAMILY DESTROY JUPITER ONE");
      console.log("");
      client.end()
  })

};

setInterval(WX, 240000); //loops WX function every 10 seconds (10000 milliseconds) TO INFINITY AND BEYOND OR ATLEAST UNTIL A REBOOT
