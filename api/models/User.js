const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        unique: true, //Ver este atributo.
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 255,
    },
})

module.exports = mongoose.model('User', userSchema)