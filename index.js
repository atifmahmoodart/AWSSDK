var awsIot = require('aws-iot-device-sdk');
const con = require('./config');
const testDevice = require('./model');

var device = awsIot.device({
    // YourPrivateKeyPath
    keyPath: "",
    // YourCertificatePath
    certPath: "",
    // YourRootCACertificatePath
    caPath: "",
    // YourUniqueClientIdentifier
    clientId: "",
    // YourCustomEndpoint
    host: ""
});

const deviceStatus = {
    isOn: false,
};

device
    .on('connect', function () {
        console.log('connect');
        //your topic name
        device.subscribe('esp32/pub');
        device.publish('esp32/pub', JSON.stringify({ test_data: 1}));
    });

device
    .on('message', function (topic, payload) {
        console.log('message', topic, payload.toString());
        if (topic === 'esp32/pub') {
            const message = JSON.parse(payload.toString());
            if (message && Object.keys(message).length > 0) {
                testDevice.insertMany({
                    humidity: message.humidity,
                    temperature: message.temperature
                })
                deviceStatus.isOn = true;
                checkDeviceStatus();
            }
        }
    });

function checkDeviceStatus() {
    console.log('Device status:', deviceStatus.isOn ? 'ON' : 'OFF');
}

