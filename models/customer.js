
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    totalAmount: {
        type: Number,
        required : true,
        default : 0
    }
})

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

