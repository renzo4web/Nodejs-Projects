const mongoose = require("mongoose")

// Create scheme => the from of the data

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 10
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
        bcrypt: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

})
module.exports= mongoose.model('User',userSchema)