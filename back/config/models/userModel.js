const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    contact_type: {type: String, required: true},
    created_at: {type: Date, require: true}    
})

module.exports = mongoose.model('userModel', userModel)
