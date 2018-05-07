'use strict';

  

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var connectionString = 'HostName=Rutu-HomeTest.azure-devices.net;DeviceId=myFirstDevice;SharedAccessKey=qdfoWBHqGLVY3PtMgWg6TOIgQxy0KzyI3hUD/Cb+oWE=';

var client = clientFromConnectionString(connectionString);
var gpio = require('rpi-gpio');

var channel = 17;
gpio.setMode(gpio.MODE_BCM);
gpio.setup(channel, gpio.DIR_IN, readInput);


function readInput() {
setInterval(function(){
	    gpio.read(channel, function (err, isDry) {
	        if (isDry) {
	            console.log('No-water yet');
notifyToIOT(isDry,'No-water yet');
	        } else {
		
	            console.log('Water found');
	            notifyToIOT(isDry,'Water found')
	        }
    	});
    },1000);
}

client.open(connectCallback);
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
  }
};



function notifyToIOT(value,msg){
	
	// Create a message and send it to the IoT Hub every second
   
                
        var data = JSON.stringify({ deviceId: 'myFirstNodeDevice', isDry: value, message: msg });
        var message = new Message(data);
        //message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
}
