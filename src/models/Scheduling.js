const mongoose = require('mongoose');
const { Schema } = mongoose;

const schedulingSchema = new Schema({
    date: Number,
    time: Number,
    userName: String,
    userEmail: String,
}, {timestamps: { createdAt: true, updatedAt: false }});

const Scheduling = mongoose.model('Scheduling', schedulingSchema);

module.exports = Scheduling;