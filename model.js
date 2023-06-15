const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let TestDevice = new Schema({
    humidity: Number,
    temperature: Number,
},
    { timestamps: true }
);

module.exports = mongoose.model("testdevice", TestDevice);