'use strict';

var iothub = require('azure-iothub');

var connectionString = 'HostName=Rutu-HomeTest.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=CPY1xvYbuWhq/Sr5RBhnRdhtzbwTkT/A0OlG5c3+V3Q=';

var registry = iothub.Registry.fromConnectionString(connectionString);

var device = {
    deviceId: 'myRaspbaryPie'
}
registry.create(device, function (err, deviceInfo, res) {
    if (err) {
        registry.get(device.deviceId, printDeviceInfo);
    }
    if (deviceInfo) {
        printDeviceInfo(err, deviceInfo, res)
    }
});

function printDeviceInfo(err, deviceInfo, res) {
    if (deviceInfo) {
        console.log('Device ID: ' + deviceInfo.deviceId);
        console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
    }
}