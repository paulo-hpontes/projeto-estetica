const mongoose = require('mongoose');
const { Schema } = mongoose;

const schedulingSchema = new Schema({
    date: Number,
    time: Number,
    userName: String,
}, {timestamps: true});

const Scheduling = mongoose.model('Scheduling', schedulingSchema);

module.exports = Scheduling;