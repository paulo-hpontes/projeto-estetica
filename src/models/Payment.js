const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    userEmail: String,
    productId: String,
    paymentId: String,
    paymentStatus: String,
}, {timestamps: true});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;