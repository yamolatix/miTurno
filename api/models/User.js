const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
        min: 3,
        max:255,

    },
    lname: {
        type: String,
        required: true,
        min: 2,
        max:255,

    },
    dni: {
        type: Number,
        required: true,
               
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
   },
    password: {
        type: String,
        required: true, 
        min: 4,
        max: 255,
   },
   admin:{
        type: Boolean,
        required: false,
        default: false,
   },
   operator:{
        type: Boolean,
        required: false,
        default: false,
   },
   phone: {
        type: String,
        required: false,
        min: 7,
        max: 255,
   },
   birthdate:{
        type: String,
        required: false,
        min:8,
        max: 12,
   }
   
})

module.exports = mongoose.model('User', userSchema)