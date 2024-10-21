const mongoose = require('mongoose');
const { Schema } = mongoose;

const daysOffSchema = new Schema({
    day: Date,
    adminEmail: String,
}, {timestamps: true});

const DaysOff = mongoose.model('DaysOff', daysOffSchema);

module.exports = DaysOff;