const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicetSchema = new Schema({
    serviceType: String,
    serviceName: String,
    serviceValue: Number,
    time: Number,
    userName: String
}, {timestamps: { createdAt: true, updatedAt: true }});

const Service = mongoose.model('Service', servicetSchema);

module.exports = Service;