var mqtt = require('mqtt')
var MQTT_TOPIC          = "WX";//sets topic
var MQTT_ADDR           = "mqtt://localhost"; //address of subscriber
var MQTT_PORT           = 1883; //common MQTT port

function mqttserver(){
var client  = mqtt.connect(MQTT_ADDR,{
  clientId: 'bgtestnodejs',
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  connectTimeout:1000,
  debug:true});

client.on('connect', function () {
  client.subscribe('WX', function (message) {
      console.log(message.toString())
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
}

mqttserver()
