var sensor = require('node-dht-sensor'); //little blue sensor modual
var temp; //global variable
var hum; //global variable
var mqtt = require('mqtt'); //import modual

var MQTT_TOPIC          = "test";//sets topic
var MQTT_ADDR           = "mqtt://76.106.248.100"; //address of subscriber
var MQTT_PORT           = 1883; //common MQTT port

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
          console.log("Entering Message Publisher");
        let obj = {temp:temp,hum:hum}; //oject is assigned value
        buf = Buffer.from(JSON.stringify(obj)); //buffer is dumped into a JSON object using obj
        console.log("Memory dumped");
        client.publish(MQTT_TOPIC, buf); //message is pulished to subscriber
          console.log("Message Sent to server");
      }
    })
  })

  client.on('message', function (topic, message) { //message is echoed on publisher terminal
    // message is Buffer
    console.log("Entering Echo");
    console.log(JSON.parse(message.toString()))
        console.log("Exiting Echo");
    client.end() //Client is terminated
  })

  client.on('error', function(){ //Error handler
    console.log("Entering error");
      console.log("DANGER WILL ROBINSON ERROR ERROR MESSAGE HANDLER FAILED DESTROY ROBINSON FAMILY DESTROY JUPITER ONE")
      console.log("Exiting error");
      client.end()
  })

};
function WX(){
  sensor.read(11, 4, function(err, temperature, humidity) {
      if (!err) {
            console.log("");
          console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
              'humidity: ' + humidity.toFixed(1) + '%'
          );
          temp = (temperature.toFixed(1));
          hum = (humidity.toFixed(1));

          console.log("SENSOR READ SUCCESSFUL " + temp);
          console.log("SENSOR READ SUCCESSFUL " + hum);
          console.log("Exiting Sensor.read");
          console.log("Calling callMQTT");
          callMQTT(temp, hum);

      }
      else {
            console.log("");
        console.log("DANGER WILL ROBINSON SENSOR IS ON VACATION DESTROY ROBINSON FAMILY DESTROY JUPITER ONE"); //sensor not working
      }
  })
};

setInterval(WX, 60000); //loops WX function every 60 seconds (10000 milliseconds) TO INFINITY AND BEYOND OR ATLEAST UNTIL A REBOOT
