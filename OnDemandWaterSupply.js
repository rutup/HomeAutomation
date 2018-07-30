'use strict';

var Protocol = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
var NoRetry = require('azure-iot-common').NoRetry;

var gpio = require('rpi-gpio');


var connectionString = 'HostName=Rutu-HomeTest.azure-devices.net;DeviceId=myFirstDevice;SharedAccessKey=qdfoWBHqGLVY3PtMgWg6TOIgQxy0KzyI3hUD/Cb+oWE=';

var client =  Client.fromConnectionString(connectionString, Protocol);


console.log('IoT Hub troubleshooting tutorial\nSimulated device #3\n')

// Print results.
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}


var channel = 18;
var interval = 1000;
gpio.setMode(gpio.MODE_BCM);

function sendOutPut() {
  console.log("Sending out put");
  
  
}
// Connect to the IoT hub.
client.open(function (err) {
  if (err) {
    console.log(chalk.red('Could not connect: ' + err));
  } else {
    console.log('Client connected');

    // Listen for SetSupplyOn being called from the hub
    client.onDeviceMethod('SetSupplyOn', function(request, response) {

      console.log('Direct method payload received:');
      gpio.setup(channel, gpio.DIR_OUT, sendOutPut);
    
    });
  }
});
