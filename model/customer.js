const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    address: String,
    purchase_amount :[{
        id: String,
        amount: String,
        current_date: String,
        due_date: String

    }],
    due_amount: String,  //overall
    paid_amount: [{
        id: String,
        amount: String,
        date: String
    }]
}, {timestamps: true})

module.exports = mongoose.model('customer', customerSchema)