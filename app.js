var sensor = require('node-dht-sensor'); //little blue sensor modual
var temp; //global variable
var hum; //global variable
var res;
var mqtt = require('mqtt'); //import modual
const {PythonShell} = require("python-shell");

var MQTT_TOPIC          = "test";//sets topic
var MQTT_ADDR           = "mqtt://76.106.248.100"; //address of subscriber
var MQTT_PORT           = 1883; //common MQTT port

function WX(){

  let options = {
    mode: 'text',
    pythonOptions: ['-u']
};

  PythonShell.run('script.py', options, function (err, results) {
    console.log('Message from Python' + results);
    res = PythonShell.run(results);
});


  sensor.read(11, 4, function(err, temperature, humidity) {
      if (!err) {
        /*  console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
              'humidity: ' + humidity.toFixed(1) + '%'
          ); */

          temp = (temperature.toFixed(1));
          hum = (humidity.toFixed(1));

          callMQTT(temp, hum, res);

      }
      else {
            console.log("");
        console.log("DANGER WILL ROBINSON SENSOR IS ON VACATION DESTROY ROBINSON FAMILY DESTROY JUPITER ONE"); //sensor not working
      }
  })
};

function callMQTT(temp, hum, res){ //wrapped MQTT message handler in function callMQTT

  var client  = mqtt.connect(MQTT_ADDR,{
    clientId: 'bgtestnodejs',
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    connectTimeout:1000,
    debug:true});

  client.on('connect', function () { //MQTT message handler "Publisher"
    client.subscribe(MQTT_TOPIC, function (err) {
      if (!err) {
        let obj = {temp:temp,hum:hum,res}; //oject is assigned value
        buf = Buffer.from(JSON.stringify(obj)); //buffer is dumped into a JSON object using obj
        client.publish(MQTT_TOPIC, buf); //message is pulished to subscriber
      }
    })
  })

  client.on('message', function (topic, message) { //message is echoed on publisher terminal
    // message is Buffer
    console.log(JSON.parse(message.toString()))
    client.end() //Client is terminated
  })

  client.on('error', function(){ //Error handler
    console.log("");
      console.log("DANGER WILL ROBINSON ERROR ERROR MESSAGE HANDLER FAILED DESTROY ROBINSON FAMILY DESTROY JUPITER ONE");
      console.log("");
      client.end()
  })

};


setInterval(WX, 10000); //loops WX function every 10 seconds (10000 milliseconds) TO INFINITY AND BEYOND OR ATLEAST UNTIL A REBOOT
