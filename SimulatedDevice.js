'use strict';

  

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var connectionString = 'HostName=Rutu-HomeTest.azure-devices.net;DeviceId=myFirstDevice;SharedAccessKey=qdfoWBHqGLVY3PtMgWg6TOIgQxy0KzyI3hUD/Cb+oWE=';

var client = clientFromConnectionString(connectionString);


console.log('rutu');
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

var connectCallback = function (err) {
console.log('rutu');
  if (err) {
    console.log('Could not connect: ' + err);
  } else {
    console.log('Client connected');

    // Create a message and send it to the IoT Hub every second
    setInterval(function(){
        var temperature = 20 + (Math.random() * 15);
        var humidity = 60 + (Math.random() * 20);            
        var data = JSON.stringify({ deviceId: 'myFirstNodeDevice', temperature: temperature, humidity: humidity });
        var message = new Message(data);
        message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 1000);
  }
};
client.open(connectCallback);

