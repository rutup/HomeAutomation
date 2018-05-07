import { setInterval } from 'timers';

'use strict';

var gpio = require('rpi-gpio');

var channel = 17;
var interval = 1000;
gpio.setMode(gpio.MODE_BCM);
gpio.setup(channel, gpio.DIR_IN, readInput);

function readInput() {
    setInterval(function () {
        gpio.read(channel, function (err, isDry) {
            if (isDry) {
                console.log('No-water yet');
            } else {
                console.log('Water found');
            }
        });
    }, interval);
}