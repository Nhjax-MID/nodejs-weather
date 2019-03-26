var temp = 23;
var hum = 25;
var mqtt = require('mqtt');

var MQTT_TOPIC          = "test"; //sets topic
var MQTT_ADDR           = "mqtt://76.106.248.100"; //address of subscriber
var MQTT_PORT           = 1883; //common MQTT port

function callMQTT(temp, hum){ //wrapped MQTT message handler in function callMQTT

  var client  = mqtt.connect(MQTT_ADDR,{ //assigns message header
    clientId: 'JAX Sensor',
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    connectTimeout:1000,
    debug:true});

  client.on('connect', function () { //MQTT message handler "Publisher"
    client.subscribe(MQTT_TOPIC, function (err) {
      if (!err) {
        let obj = {temp:temp,hum:hum}; //oject is assigned value
        buf = Buffer.from(JSON.stringify(obj)); //buffer is dumped into a JSON object using obj
        client.publish(MQTT_TOPIC, buf); //message is pulished to subscriber
      }
    })
  })

  client.on('message', function (topic, message) { //message is echoed on publisher terminal
    // message is Buffer
    console.log(JSON.parse(message.toString()))
    client.end()//Client is terminated
  })

  client.on('error', function(){//Error handler
    console.log("Entering error");
      console.log("DANGER WILL ROBINSON ERROR ERROR DESTROY ROBINSON FAMILY DESTROY JUPITER ONE")
      console.log("Exiting error");
      client.end()
  })

};

setInterval(callMQTT, 10000, temp, hum); //loops callMQTT function every 10 seconds (10000 milliseconds)
