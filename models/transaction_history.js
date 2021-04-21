
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const transaction = mongoose.model("transaction", transactionSchema);

module.exports = transaction;