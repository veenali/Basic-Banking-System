
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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

const Admin = mongoose.model('admin',adminSchema );
module.exports = Admin;