//import { setInterval } from 'timers';

'use strict';

var gpio = require('rpi-gpio');
var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var connectionString = 'HostName=Rutu-HomeTest.azure-devices.net;DeviceId=myFirstDevice;SharedAccessKey=qdfoWBHqGLVY3PtMgWg6TOIgQxy0KzyI3hUD/Cb+oWE=';

var client = clientFromConnectionString(connectionString);

var channel = 17;
var interval = 1000;
gpio.setMode(gpio.MODE_BCM);
gpio.setup(channel, gpio.DIR_IN, readInput);

function readInput() {
    setInterval(function () {
       
    }, interval);
}


function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var connectCallback = function (err) {
     if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');

        // Create a message and send it to the IoT Hub every second
        setInterval(function () {
            gpio.read(channel, function (err, isDry) {
                if (isDry) {
                    console.log('WaterNotFound');
                } else {
                    console.log('WaterFound');
                }
                var data = JSON.stringify({ deviceId: 'myFirstNodeDevice', isDry: isDry, message: 'Checking WaterLevel' });
                var message = new Message(data);
                // message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
                console.log("Sending message: " + message.getData());
                client.sendEvent(message, printResultFor('send'));
            });
            
        }, interval);
    }
};
client.open(connectCallback);
